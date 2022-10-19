import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Device {
  constructor(params?: Partial<Device>) {
    if (params) {
      this.id = params.id;
      this.description = params.description;
      this.address = params.address;
      this.maximumHourlyConsumption = params.maximumHourlyConsumption;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  maximumHourlyConsumption: number;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: false,
  })
  user: User;
}
