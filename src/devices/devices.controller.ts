import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { DevicesService } from "./devices.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";

@UseGuards(JwtAuthGuard)
@Controller("devices")
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get("user/:id")
  getForUser(@Param("id") id: string) {
    return this.devicesService.findForUser(+id);
  }

  @Get("not-user/:id")
  getForNotUser(@Param("id") id: string) {
    return this.devicesService.findForNotUser(+id);
  }

  @Post("associate")
  associate(@Body() q: any) {
    return this.devicesService.associate(q.userId, q.deviceId);
  }

  @Delete("disassociate/:id")
  disassociate(@Param("id") id: string) {
    return this.devicesService.disassociate(+id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.devicesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.devicesService.remove(+id);
  }
}
