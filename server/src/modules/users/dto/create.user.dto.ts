import { PickType } from "@nestjs/mapped-types";

import {
  IsEnum,
  IsEmail,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from "class-validator";

enum Gender {
  M = "M",
  F = "F",
  O = "O",
}

enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  ARTIST = "ARTIST",
}

export class CreateUserDto {
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}

export class LoginDto extends PickType(CreateUserDto, [
  "email",
  "password",
] as const) {}

export class UserUpdateDto extends PickType(CreateUserDto, [
  "firstName",
  "lastName",
  "address",
  "phone",
  "dob",
  "gender",
  "role",
] as const) {}
