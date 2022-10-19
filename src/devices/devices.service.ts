import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { Device } from "./entities/device.entity";

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findForUser(userId: number) {
    return this.deviceRepository.createQueryBuilder("device").where("device.userId = :userId", { userId }).getMany();
  }

  async create(createDeviceDto: CreateDeviceDto) {
    const device = new Device({
      description: createDeviceDto.description,
      address: createDeviceDto.address,
      maximumHourlyConsumption: createDeviceDto.maximumHourlyConsumption,
      user: await this.userRepository.findOne({ where: { id: createDeviceDto.userId } }),
    });
    return await this.deviceRepository.save(device);
  }

  findAll() {
    return this.deviceRepository.find();
  }

  findOne(id: number) {
    return this.deviceRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.findOne(id);
    if (updateDeviceDto.address) device.address = updateDeviceDto.address;
    if (updateDeviceDto.description) device.description = updateDeviceDto.description;
    if (updateDeviceDto.maximumHourlyConsumption) device.maximumHourlyConsumption = updateDeviceDto.maximumHourlyConsumption;
    return await this.deviceRepository.save(device);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
