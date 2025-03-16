import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

import knexStringcase from "knex-stringcase";
import { KnexConfig } from "src/knex/knex.interface";
import { DatabaseConfig } from "./interface/config.interface";

@Injectable()
export class ConfigService {
  constructor(private readonly configs: NestConfigService) {}

  getDatabaseConfig(): DatabaseConfig {
    const config = this.configs.get<DatabaseConfig>("database");
    if (!config) {
      throw new Error("Database configuration is missing");
    }
    return config;
  }

  getKnexConfig(): KnexConfig {
    const databaseConfig = this.getDatabaseConfig();

    return knexStringcase({
      client: databaseConfig.client,
      connection: {
        host: databaseConfig.host,
        user: databaseConfig.user,
        password: databaseConfig.password,
        database: databaseConfig.name,
        port: databaseConfig.port,
      },
    });
  }
}
