import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
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
