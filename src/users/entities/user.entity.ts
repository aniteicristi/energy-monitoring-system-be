import { Device } from "src/devices/entities/device.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  constructor(params?: Partial<User>) {
    if (params) {
      this.id = params.id;
      this.email = params.email;
      this.passwordHash = params.passwordHash;
      this.role = params.role;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  role: string;

  @OneToMany(() => Device, (device) => device.user, {
    createForeignKeyConstraints: false,
  })
  devices: Device[];
}
