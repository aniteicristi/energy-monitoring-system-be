import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Session {
  constructor(params?: Partial<Session>) {
    if (params) {
      this.userId = params.userId;
      this.socketId = params.socketId;
    }
  }

  @PrimaryColumn()
  userId: number;

  @Column()
  socketId: string;
}
