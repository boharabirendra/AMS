import { registerAs } from '@nestjs/config';

import { DatabaseConfig } from './interface/config.interface';
import { EnvironmentConfig } from './environment.config';

const envConfig = new EnvironmentConfig();

export default registerAs(
  'database',
  (): DatabaseConfig => ({
    client: envConfig.getSecret('DB_CLIENT'),
    host: envConfig.getSecret('POSTGRES_HOST'),
    user: envConfig.getSecret('POSTGRES_USER'),
    password: envConfig.getSecret('POSTGRES_PASSWORD'),
    name: envConfig.getSecret('POSTGRES_DB'),
    port: Number(envConfig.getSecret('POSTGRES_PORT')),
  }),
);
