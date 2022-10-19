import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEnergyConsumptionDto } from "./dto/create-energy-consumption.dto";
import { UpdateEnergyConsumptionDto } from "./dto/update-energy-consumption.dto";
import { EnergyConsumption } from "./entities/energy-consumption.entity";

@Injectable()
export class EnergyConsumptionService {
  constructor(
    @InjectRepository(EnergyConsumption)
    private readonly energyRepository: Repository<EnergyConsumption>
  ) {}

  findForDevice(deviceId: number) {
    return this.energyRepository.find({
      where: {
        device: {
          id: deviceId,
        },
      },
    });
  }

  create(dto: CreateEnergyConsumptionDto) {
    return this.energyRepository.save({
      timestamp: dto.timestamp ? new Date(dto.timestamp) : new Date(),
      value: dto.value,
      device: { id: dto.deviceId },
    });
  }

  remove(id: number) {
    return this.energyRepository.delete(id);
  }
}
