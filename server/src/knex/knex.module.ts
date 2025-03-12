import { Global, Module } from '@nestjs/common';
import { knexConnectionFactory } from './knex.factory';
import { ConfigModule } from 'src/config/config.module';
import { KnexService } from './knex.service';

@Global()
@Module({
  exports: [KnexService, knexConnectionFactory],
  imports: [ConfigModule],
  providers: [KnexService, knexConnectionFactory],
})
export class KnexModule {}
