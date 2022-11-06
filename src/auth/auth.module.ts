import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt.guard";
import { JwtStrategy } from "./jwt.strategy";
import { LocalAuthGuard } from "./local.guard";
import { LocalStrategy } from "./local.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "secred he he",
      signOptions: { expiresIn: "60d" },
    }),
  ],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
