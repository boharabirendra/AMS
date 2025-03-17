import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";

import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { ConfigService } from "@nestjs/config";

import { User } from "./model/user.model";
import { MenusService } from "../menus/menus.service";
import { hashPassword } from "src/utils/password.utils";
import { CreateUserDto, LoginDto } from "./dto/create.user.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly user: User,
    private readonly menusService: MenusService,
    private readonly configService: ConfigService
  ) {}

  /** Create user */
  async create(userBody: CreateUserDto) {
    const { email, password } = userBody;

    const user = (await this.findByMail(email)) as CreateUserDto;
    if (user) {
      throw new ConflictException(`User with email: ${email} already exist`);
    }

    const hashedPassword = await hashPassword(password);

    await this.user.create({ ...userBody, password: hashedPassword });
  }

  /**Update user by id */
  async updateById(updateBody: CreateUserDto, id: number) {
    const user = (await this.findById(id)) as CreateUserDto;

    if (!user) {
      throw new NotFoundException(`User with ${id} does not exists`);
    }

    const hashedPassword = await hashPassword(updateBody.password);
    updateBody.password = hashedPassword;

    const updateCount = await this.user.updateById(updateBody, id);

    if (updateCount === 0) {
      throw new InternalServerErrorException(`Updation Failed`);
    }

    return `User with ${id} updated.`;
  }

  /** Delete user by id */
  async deleteById(id: number) {
    const user = (await this.findById(id)) as CreateUserDto;

    if (!user) {
      throw new NotFoundException(`User with ${id} does not exists`);
    }

    const deletedCount = await this.user.deleteById(id);
    if (deletedCount === 0) {
      throw new InternalServerErrorException(`Deletion Failed`);
    }

    return `User with ${id} deleted.`;
  }

  /**User login */
  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    const user = (await this.findByMail(email)) as CreateUserDto;

    if (!user) {
      throw new UnauthorizedException("Email Or Password Is Not Correct");
    }

    const { id, firstName, lastName, password: hashedPassword, role } = user;

    const isPasswordCorrect = await compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException("Email Or Password Is Not Correct");
    }

    const accessToken = jwt.sign(
      {
        id,
        role,
        email,
        lastName,
        firstName,
      },
      this.configService.get("JSON_SECRET_KEY")!,
      {
        expiresIn: this.configService.get("EXP_TIME"),
      }
    );

    return accessToken;
  }

  /**Find user by email */
  findByMail(email: string) {
    return this.user.findByEmail(email);
  }

  /**Find user by id */
  findById(id: number) {
    return this.user.findById(id);
  }

  /**Get all users */
  async getAll() {
    const users = await this.user.getAll();
    return {
      users: users.map(({ password, ...rest }) => rest),
    };
  }
}
