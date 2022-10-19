import { Device } from "src/devices/entities/device.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EnergyConsumption {
  constructor(params?: Partial<EnergyConsumption>) {
    if (params) {
      this.id = params.id;
      this.timestamp = params.timestamp;
      this.value = params.value;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime" })
  timestamp: Date;

  @Column()
  value: number;

  @ManyToOne(() => Device, {
    createForeignKeyConstraints: false,
  })
  device: Device;
}
