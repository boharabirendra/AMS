import {
  Get,
  Put,
  Req,
  Res,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Controller,
  ParseIntPipe,
} from "@nestjs/common";
import { Request, Response } from "express";

import { UsersService } from "./users.service";
import { RolesGuard } from "../roles/role.guard";
import { Roles } from "../roles/roles.decorator";
import { USER_TYPES } from "../roles/roles.enum";
import { CreateUserDto, LoginDto } from "./dto/create.user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(USER_TYPES.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return {
      message: "User created successfully.",
    };
  }

  @Post("login")
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    const accessToken = await this.userService.login(loginDto);
    res.cookie("accessToken", accessToken, { httpOnly: true });
    return res.status(200).json({ message: "Login successful" });
  }

  @Post("logout")
  async logout(@Res() res: Response) {
    res.clearCookie("accessToken", { httpOnly: true });
    return res.status(200).json({ message: "Logout successful" });
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(USER_TYPES.ADMIN)
  async update(@Body() updateUserDto: CreateUserDto, @Req() req: Request) {
    const user = req["user"] as CreateUserDto;
    const message = await this.userService.updateById(updateUserDto, user.id);
    return {
      message,
    };
  }

  @Delete(":id")
  @UseGuards(RolesGuard)
  @Roles(USER_TYPES.ADMIN)
  async deleteById(@Param("id", ParseIntPipe) id: number) {
    const message = await this.userService.deleteById(id);
    return { message };
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(USER_TYPES.ADMIN)
  async getAll(@Req() req: Request) {
    const users = await this.userService.getAll();
    return users;
  }
}
