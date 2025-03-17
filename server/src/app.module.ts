import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";

import { KnexModule } from "./knex/knex.module";
import { ConfigModule } from "./config/config.module";
import { SongModule } from "./modules/song/song.module";
import { UsersModule } from "./modules/users/users.module";
import { MenusModule } from "./modules/menus/menus.module";
import { ArtistModule } from "./modules/artist/artist.module";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./modules/roles/role.guard";

@Module({
  imports: [
    ConfigModule,
    KnexModule,
    UsersModule,
    ArtistModule,
    SongModule,
    MenusModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: "users", method: RequestMethod.POST },
        { path: "users/login", method: RequestMethod.POST }
      )
      .forRoutes("*");
  }
}
