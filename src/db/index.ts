import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

type Config = {
  database: string;
  username: string;
  password: string;
  host?: string;
  migrationsFolder: string;
};

export class DatabaseService {
  constructor(
    private connection: ReturnType<typeof postgres>,
    public orm: ReturnType<typeof drizzle>,
  ) {}

  static async new(config: Config) {
    const commonConnectionOptions: postgres.Options<any> = {
      database: config.database,
      username: config.username,
      password: config.password,
      ...(config.host && {
        host: config.host,
      }),
    };
    const migrationConnection = postgres({
      ...commonConnectionOptions,
      max: 1,
    });
    await migrate(drizzle(migrationConnection), {
      migrationsFolder: config.migrationsFolder,
    });
    await migrationConnection.end();

    const connection = postgres(commonConnectionOptions);
    return new DatabaseService(connection, drizzle(connection));
  }

  public async closeConnection() {
    await this.connection.end();
  }
}
