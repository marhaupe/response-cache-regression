import fs from 'fs';
import { parse } from 'yaml';
import { z } from 'zod';
import parseArgs from 'minimist';

const configSchema = z.object({
  port: z.number().int().default(3000),
  host: z.string().default('0.0.0.0'),
  database: z.object({
    user: z.string().nonempty(),
    password: z.string().nonempty(),
    name: z.string().nonempty(),
  }),
  redis: z
    .object({
      port: z.number(),
      host: z.string().nonempty(),
    })
    .optional(),
  caching: z
    .object({
      enabled: z.boolean(),
    })
    .default({ enabled: true }),
});

const { config: configPath } = parseArgs(process.argv.slice(2));
const fileConfigContent = fs.readFileSync(configPath || 'config.yml', 'utf8');
const fileConfig = parse(fileConfigContent);

export type Config = z.infer<typeof configSchema>;
export const config = configSchema.parse(fileConfig);
