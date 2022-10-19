import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { Device } from "src/devices/entities/device.entity";
import { use } from "passport";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User({
      email: createUserDto.email,
      passwordHash: await bcrypt.hash(createUserDto.password, 10),
      role: "regular",
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  search(partial: string) {
    return this.userRepository.find({
      where: {
        email: Like(`%${partial}%`),
      },
    });
  }

  async addDevice(deviceId: number, userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const device = await this.deviceRepository.findOne({ where: { id: deviceId } });

    user.devices.push(device);
    await this.userRepository.save(user);
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.password) user.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    await this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
