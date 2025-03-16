import {
  Put,
  Req,
  Res,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  Get,
} from "@nestjs/common";
import { Request, Response } from "express";

import { UsersService } from "./users.service";
import { CreateUserDto, LoginDto } from "./dto/create.user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
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
    return res.json({ message: "Login successful" });
  }

  @Put()
  async update(@Body() updateUserDto: CreateUserDto, @Req() req: Request) {
    const user = req["user"] as CreateUserDto;
    const message = await this.userService.updateById(updateUserDto, user.id);
    return {
      message,
    };
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseIntPipe) id: number) {
    const message = await this.userService.deleteById(id);
    return { message };
  }

  @Get()
  async getAll(@Req() req: Request) {
    const user = req["user"];
    const usersWithMenus = await this.userService.getAll(user);
    return usersWithMenus;
  }
}
