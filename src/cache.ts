import { createInMemoryCache } from '@envelop/response-cache';
import { createRedisCache as createRedisResponseCache } from '@envelop/response-cache-redis';
import Redis from 'ioredis';
import Keyv from 'keyv';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import KeyvRedis from '@keyv/redis';
import { Cache } from '@envelop/response-cache';

type CacheOptions = {
  enabled: boolean;
  redisHost?: string;
  redisPort?: number;
};

export function getCaches({ enabled, redisHost, redisPort }: CacheOptions): {
  redis?: Redis;
  responseCache?: Cache;
  dataSourceCache?: KeyvAdapter;
} {
  if (!enabled) {
    return {
      redis: undefined,
      responseCache: undefined,
      dataSourceCache: undefined,
    };
  }
  if (!(redisHost && redisPort)) {
    return {
      redis: undefined,
      responseCache: createInMemoryCache(),
      dataSourceCache: new KeyvAdapter(new Keyv()),
    };
  }
  const redis = new Redis({
    host: redisHost,
    port: redisPort,
  });
  const dataSourceCache = new KeyvAdapter(
    new Keyv({ store: new KeyvRedis(redis) }),
  );
  const responseCache = createRedisResponseCache({
    redis,
    buildRedisOperationResultCacheKey: (responseId) => `rc:${responseId}`,
    buildRedisEntityId: (typename, id) => `rc:${typename}:${id}`,
  });

  return {
    redis,
    responseCache,
    dataSourceCache,
  };
}
