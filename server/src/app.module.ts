import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { SongModule } from './modules/song/song.module';
import { UsersModule } from './modules/users/users.module';
import { ArtistModule } from './modules/artist/artist.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, UsersModule, ArtistModule, SongModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
