import { hash } from "bcryptjs";

export function hashPassword(password: string) {
  return hash(password, 10);
}
