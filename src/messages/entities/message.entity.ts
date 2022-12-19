import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MessageRecord {
  constructor(params?: Partial<MessageRecord>) {
    if (params) {
      this.id = params.id;
      this.from = params.from;
      this.to = params.to;
      this.content = params.content;
      this.createdAt = params.createdAt;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    eager: true,
    createForeignKeyConstraints: false,
  })
  from: User;

  @ManyToOne(() => User, {
    eager: true,
    createForeignKeyConstraints: false,
  })
  to: User;

  @Column()
  content: string;

  @Column({ type: "datetime" })
  createdAt: Date;
}
