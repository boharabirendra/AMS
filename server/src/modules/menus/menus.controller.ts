import { Controller, Get, Req } from "@nestjs/common";
import { MenusService } from "./menus.service";
import { Request } from "express";

@Controller("options")
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get("menus")
  getMenus(@Req() req: Request) {
    const { role } = req["user"];
    const menus = this.menusService.calculateMenus(role);
    return { menus };
  }

  @Get("permissions")
  getPermissions(@Req() req: Request) {
    const { role } = req["user"];
    const permissions = this.menusService.getPermissions(role);
    return { permissions };
  }
}
