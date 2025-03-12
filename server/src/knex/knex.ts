import BaseModel from 'src/models/BaseModel';
import { KnexService } from './knex.service';
import { KNEX_CONNECTION } from 'src/constants/knex';

export const knexConnectionFactory = {
  provide: KNEX_CONNECTION,
  useFactory: (knexService: KnexService) => knexService.getKnex(),
  inject: [KnexService, BaseModel],
};
