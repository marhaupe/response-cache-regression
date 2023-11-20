import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DatabaseService } from './db';
import { ProductService } from './services/product.service';
import { Logger } from 'pino';
import { logger } from './logger';
import { Cache } from '@envelop/response-cache';

export const TRACE_ID_HEADER = 'x-b3-traceid';
export const USER_ID_HEADER = 'x-anon-id';

export type Context = {
  productService: ProductService;
  db: PostgresJsDatabase;
  log: Logger;
  responseCache?: Cache;
  clientInfo: {
    userId?: string;
  };
};

export type CreateBaseContextOptions = {
  headers: Headers;
  orm: DatabaseService['orm'];
  responseCache?: Cache;
};

export function createBaseContext({
  headers,
  orm,
  responseCache,
}: CreateBaseContextOptions): Omit<Context, 'dataSources'> {
  const userId = headers.get(USER_ID_HEADER) || undefined;
  const log = logger.child({});

  const init = {
    log,
    orm,
  };
  return {
    db: orm,
    productService: new ProductService(init),
    log,
    responseCache,
    clientInfo: {
      userId,
    },
  };
}
