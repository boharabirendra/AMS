import { config } from 'dotenv';
import { KnexConfig } from './src/knex/knex.interface';

config();

const connection = {
  client: process.env.DB_CLIENT || '',
  port: process.env.POSTGRES_PORT || '',
  host: process.env.POSTGRES_HOST || '',
  user: process.env.POSTGRES_USER || '',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DB || '',
};

const knexConfig: KnexConfig = {
  connection,
  client: process.env.DB_CLIENT,
  migrations: {
    tableName: 'migrations_ams',
    directory: './database/migrations',
    stub: __dirname + '/stub/migration.stub',
  },
  seeds: {
    directory: './database/seeds',
  },
};

export default knexConfig;
