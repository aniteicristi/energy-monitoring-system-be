import { RabbitPayload, RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { Controller, Injectable } from "@nestjs/common";
import { CreateEnergyConsumptionDto } from "src/energy-consumption/dto/create-energy-consumption.dto";
import { EnergyConsumptionService } from "src/energy-consumption/energy-consumption.service";

@Injectable()
export class RmqService {
  constructor(private readonly energyService: EnergyConsumptionService) {}

  @RabbitSubscribe({
    exchange: "",
    routingKey: "device_consumption",
    queue: "device_consumption",
  })
  onReading(message: CreateEnergyConsumptionDto) {
    return this.energyService.create(message);
  }
}
