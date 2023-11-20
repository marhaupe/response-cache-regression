import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { Logger } from 'pino';

export type ServiceInit = {
  orm: PostgresJsDatabase;
  log: Logger;
};
