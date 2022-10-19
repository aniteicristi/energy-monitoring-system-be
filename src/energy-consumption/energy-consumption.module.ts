import { Module } from "@nestjs/common";
import { EnergyConsumptionService } from "./energy-consumption.service";
import { EnergyConsumptionController } from "./energy-consumption.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnergyConsumption } from "./entities/energy-consumption.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EnergyConsumption])],
  controllers: [EnergyConsumptionController],
  providers: [EnergyConsumptionService],
})
export class EnergyConsumptionModule {}
