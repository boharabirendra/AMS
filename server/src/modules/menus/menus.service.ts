import { Injectable } from "@nestjs/common";

import { MENUS } from "src/constants/menu";
import {
  ADMIN_ROLES,
  ARTIST_ROLES,
  MANAGER_ROLES,
  USER_TYPES,
} from "src/constants/role";

@Injectable()
export class MenusService {
  private menus: string[] = [];
  calculateMenus(userType: string): string[] {
    this.menus.length = 0;
    if (userType === USER_TYPES.ADMIN) {
      this.menus = Object.values(MENUS);
    }

    if (userType === USER_TYPES.MANAGER) {
      this.menus.push(MENUS.ARTISTS);
      this.menus.push(MENUS.SONGS);
    }

    if (userType === USER_TYPES.ARTIST) {
      this.menus.push(MENUS.ARTISTS);
    }

    return this.menus;
  }

  getPermissions(userType: string) {
    if (userType === USER_TYPES.ADMIN) return ADMIN_ROLES;
    if (userType === USER_TYPES.MANAGER) return MANAGER_ROLES;
    return ARTIST_ROLES;
  }
}
