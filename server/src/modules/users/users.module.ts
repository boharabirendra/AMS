import { Module } from "@nestjs/common";

import { User } from "./model/user.model";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MenusService } from "../menus/menus.service";

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, MenusService, User],
})
export class UsersModule {}
