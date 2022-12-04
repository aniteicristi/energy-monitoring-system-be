import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { EnergyConsumptionService } from "./energy-consumption.service";
import { CreateEnergyConsumptionDto } from "./dto/create-energy-consumption.dto";
import { UpdateEnergyConsumptionDto } from "./dto/update-energy-consumption.dto";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { Roles } from "src/auth/roles.decorator";
import { Role } from "src/auth/roles.enum";
import { RolesGuard } from "src/auth/roles.guard";
import { NotifierGateway } from "src/notifier/notifier.gateway";

@Controller("energy-consumption")
export class EnergyConsumptionController {
  constructor(private readonly energyConsumptionService: EnergyConsumptionService, private readonly gateway: NotifierGateway) {}

  @Roles(Role.User, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("/device/:id")
  getByDevice(@Param("id") deviceId: string) {
    return this.energyConsumptionService.findForDevice(+deviceId);
  }

  @Post()
  create(@Body() createEnergyConsumptionDto: CreateEnergyConsumptionDto) {
    return this.energyConsumptionService.create(createEnergyConsumptionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.energyConsumptionService.remove(+id);
  }

  @Get("/test/:id")
  test(@Param("id") usr: number) {
    return this.gateway.sendNotificaiton(usr, "hello!");
  }
}
