import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { LocalAuthGuard } from "src/auth/local.guard";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "src/auth/roles.enum";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/search")
  searchAll(@Query("partial") partial: string) {
    return this.usersService.search(partial);
  }

  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/self")
  getSelf(@Req() request: any) {
    return request.user;
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/admin")
  getAdmin() {
    return this.usersService.getAdmin();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
