import { Injectable, Logger } from "@nestjs/common";

import KnexInitiator, { Knex } from "knex";
import { KnexConfig } from "./knex.interface";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class KnexService {
  private readonly logger: Logger;
  private _knexConnection: Knex;
  private _knexOptions: KnexConfig;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger("KnexService");

    this._knexOptions = configService.getKnexConfig();
  }

  getKnex() {
    if (!this._knexConnection) {
      this._knexConnection = KnexInitiator(this._knexOptions);
    }

    return this._knexConnection;
  }
}
