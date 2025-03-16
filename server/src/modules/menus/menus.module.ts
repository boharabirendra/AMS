import { Module } from "@nestjs/common";
import { MenusService } from "./menus.service";

@Module({
  controllers: [],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenusModule {}
