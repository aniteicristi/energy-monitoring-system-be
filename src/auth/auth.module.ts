import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtModule],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "secred he he",
      signOptions: { expiresIn: "60d" },
    }),
  ],
})
export class AuthModule {}
