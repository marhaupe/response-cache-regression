import { createYoga, createSchema } from 'graphql-yoga';
import { resolvers } from './schema/resolvers.generated';
import { typeDefs } from './schema/typeDefs.generated';
import { Context, USER_ID_HEADER, createBaseContext } from './context';
import Fastify from 'fastify';
import { config } from './config';
import { DatabaseService } from './db';
import { logger, requestIdLogLabel } from './logger';
import FastifyGracefulShutdown from 'fastify-graceful-shutdown';
import { useResponseCache } from '@envelop/response-cache';
import { getCaches } from './cache';
import { loggerPlugin } from './loggerPlugin';

async function startServer() {
  const caches = getCaches({
    enabled: config.caching.enabled,
    redisHost: config.redis?.host,
    redisPort: config.redis?.port,
  });
  const fastify = Fastify({
    logger,
    disableRequestLogging: true,
    requestIdLogLabel,
  });

  const databaseService = await DatabaseService.new({
    database: config.database.name,
    username: config.database.user,
    password: config.database.password,
    migrationsFolder: './drizzle',
  });

  fastify.register(FastifyGracefulShutdown).after((err) => {
    if (err) {
      fastify.log.error(err);
    }
    fastify.gracefulShutdown(
      async (signal: string, next: (err?: Error | undefined) => void) => {
        try {
          fastify.log.info(signal + ' received');

          fastify.log.info('disconnecting from database...');
          await databaseService.closeConnection();
          fastify.log.info('disconnected from database');

          if (caches.redis) {
            fastify.log.info('disconnecting from redis...');
            await caches.redis.quit();
            fastify.log.info('disconnected from redis');
          }

          fastify.log.flush();
          next();
        } catch (err: any) {
          fastify.log.error(err);
          fastify.log.flush();
          next(err);
        }
      },
    );
  });

  const yoga = createYoga({
    graphiql: true,
    logging: {
      debug: (...args) => args.forEach((arg) => fastify.log.debug(arg)),
      info: (...args) => args.forEach((arg) => fastify.log.info(arg)),
      warn: (...args) => args.forEach((arg) => fastify.log.warn(arg)),
      error: (...args) => args.forEach((arg) => fastify.log.error(arg)),
    },
    graphqlEndpoint: '/graphql',
    healthCheckEndpoint: undefined,
    context({ request: { headers } }): Context {
      const baseContext = createBaseContext({
        headers,
        orm: databaseService.orm,
        responseCache: caches.responseCache,
      });
      return {
        ...baseContext,
      };
    },
    schema: createSchema({
      typeDefs,
      resolvers,
    }),

    plugins: [
      loggerPlugin,
      caches.responseCache != null &&
        useResponseCache({
          cache: caches.responseCache,
          includeExtensionMetadata: true,
          session: ({ request }) =>
            `${request.headers.get(USER_ID_HEADER) ?? ''}:${
              request.headers.get('accept-language') ?? 'de-DE'
            }`,
          ttl: 10 * 60 * 1000, // 10 min
        }),
    ],
  });

  fastify.route({
    url: yoga.graphqlEndpoint,
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      const response = await yoga.handleNodeRequest(req, {
        req,
        reply,
      });
      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);

      reply.send(response.body);

      return reply;
    },
  });

  fastify.listen({ port: config.port, host: config.host });
}

startServer();
