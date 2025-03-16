import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new UnauthorizedException("Access token required.");
    }

    try {
      const payload = jwt.verify(
        accessToken,
        this.configService.get("JSON_SECRET_KEY")!
      );

      req["user"] = payload;
    } catch (error) {
      throw new UnauthorizedException("Token invalid or expired");
    }

    next();
  }
}
