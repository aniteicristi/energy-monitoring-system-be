import { Injectable, Logger } from "@nestjs/common";
import { DevicesService } from "src/devices/devices.service";
import { EnergyConsumptionService } from "src/energy-consumption/energy-consumption.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class SeederService {
  constructor(private userService: UsersService, private deviceService: DevicesService, private energyConsumptionService: EnergyConsumptionService, private logger: Logger) {}

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  public async seed() {
    let date = new Date();

    for (let i = 0; i < 48; i++) {
      await this.energyConsumptionService.create({
        timestamp: date.toISOString(),
        value: this.getRandomInt(100),
        deviceId: 3,
      });
      date.setHours(date.getHours() + 1);
    }
  }
}
