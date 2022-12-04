import { Module } from "@nestjs/common";
import { EnergyConsumptionService } from "./energy-consumption.service";
import { EnergyConsumptionController } from "./energy-consumption.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnergyConsumption } from "./entities/energy-consumption.entity";
import { NotifierModule } from "src/notifier/notifier.module";

@Module({
  imports: [NotifierModule, TypeOrmModule.forFeature([EnergyConsumption])],
  controllers: [EnergyConsumptionController],
  providers: [EnergyConsumptionService],
  exports: [EnergyConsumptionService],
})
export class EnergyConsumptionModule {}
