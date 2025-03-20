import BaseModel from "src/models/BaseModel";
import { CreateUserDto, UserUpdateDto } from "../dto/create.user.dto";

export class User extends BaseModel {
  private readonly TABLE_NAME = "user";

  create(userBody: CreateUserDto) {
    return this.query.table(this.TABLE_NAME).insert({
      ...userBody,
    });
  }

  updateById(updateBody: UserUpdateDto, id: number) {
    return this.query
      .table(this.TABLE_NAME)
      .update({
        ...updateBody,
      })
      .where({ id });
  }

  deleteById(id: number) {
    return this.query.table(this.TABLE_NAME).delete().where({ id });
  }

  findByEmail(email: string) {
    return this.query
      .table(this.TABLE_NAME)
      .select("*")
      .where({ email })
      .first();
  }

  findById(id: number) {
    return this.query.table(this.TABLE_NAME).select("*").where({ id }).first();
  }

  getAll() {
    return this.query.table(this.TABLE_NAME).select("*");
  }
}
