import { Module } from "@nestjs/common";
import { EnergyConsumptionService } from "./energy-consumption.service";
import { EnergyConsumptionController } from "./energy-consumption.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnergyConsumption } from "./entities/energy-consumption.entity";
import { NotifierModule } from "src/notifier/notifier.module";
import { DevicesModule } from "src/devices/devices.module";

@Module({
  imports: [DevicesModule, NotifierModule, TypeOrmModule.forFeature([EnergyConsumption])],
  controllers: [EnergyConsumptionController],
  providers: [EnergyConsumptionService],
  exports: [EnergyConsumptionService],
})
export class EnergyConsumptionModule {}
