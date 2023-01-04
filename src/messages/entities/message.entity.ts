import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { MessageType } from "../interfaces/message-type.enum";
import { TextMessage } from "../interfaces/text-message.interface";

@Entity()
export class MessageRecord {
  constructor(params?: Partial<MessageRecord>) {
    if (params) {
      this.id = params.id;
      this.from = params.from;
      this.to = params.to;
      this.content = params.content;
      this.createdAt = params.createdAt;
      this.seen = params.seen;
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

  @Column({ default: false })
  seen: boolean;

  toProtoc(): TextMessage {
    return {
      type: MessageType.CONTENT,
      to: this.to.id,
      from: this.from.id,
      message: this.content,
      seen: this.seen,
      createdAt: this.createdAt.toUTCString(),
      id: this.id,
    };
  }
}
