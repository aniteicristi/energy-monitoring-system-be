import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { format, startOfHour } from "date-fns";
import { timestamp } from "rxjs";
import { DevicesService } from "src/devices/devices.service";
import { NotifierGateway } from "src/notifier/notifier.gateway";
import { Repository } from "typeorm";
import { CreateEnergyConsumptionDto } from "./dto/create-energy-consumption.dto";
import { UpdateEnergyConsumptionDto } from "./dto/update-energy-consumption.dto";
import { EnergyConsumption } from "./entities/energy-consumption.entity";

@Injectable()
export class EnergyConsumptionService {
  constructor(
    @InjectRepository(EnergyConsumption)
    private readonly energyRepository: Repository<EnergyConsumption>,
    private readonly deviceService: DevicesService,
    private readonly notifierService: NotifierGateway
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

  async create(dto: CreateEnergyConsumptionDto) {
    const timestamp = new Date(dto.timestamp);
    const device = await this.deviceService.findOne(dto.deviceId);

    const entry = await this.energyRepository.save({
      timestamp: timestamp,
      value: dto.value,
      device: { id: dto.deviceId },
    });
    console.log(`Recieved consumption for device ${dto.deviceId} of ${dto.value} kWatts.`);

    this.notifierService.sendUpdate(device, dto);

    const start = startOfHour(timestamp);

    const { sum } = await this.energyRepository
      .createQueryBuilder("energy")
      .where("energy.timestamp > :date AND energy.deviceId = :id", { date: start, id: device.id })
      .select("SUM(energy.value)", "sum")
      .getRawOne();

    console.log(`Current sum for hour ${format(start, "H")} is ${sum}.`);
    if (sum > device.maximumHourlyConsumption) {
      this.notifierService.sendNotification(device.user.id, `Your device with address: ${device.address} has exceeded the maximum hourly consumption limit with a consumption of ${sum} kWatts.`);
    }
  }

  remove(id: number) {
    return this.energyRepository.delete(id);
  }
}
