import { UseGuards, Post, Controller, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
