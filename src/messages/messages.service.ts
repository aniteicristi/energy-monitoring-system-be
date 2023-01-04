import { Injectable, NotImplementedException } from "@nestjs/common";
import { TextMessage } from "./interfaces/text-message.interface";
import { Response } from "./interfaces/post-message-response.interface";
import { Client } from "./interfaces/conversation.interface";
import { Observable, Subject } from "rxjs";
import { Repository } from "typeorm";
import { MessageRecord } from "./entities/message.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageType } from "./interfaces/message-type.enum";
import { ResponseType } from "./interfaces/response-type.enum";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(MessageRecord) private messagesRepository: Repository<MessageRecord>, @InjectRepository(User) private userRepository: Repository<User>) {}

  subjects: Record<number, Subject<TextMessage>> = {};

  async postMessage(data: TextMessage): Promise<Response> {
    if (!data.type) data.type = MessageType.CONTENT;
    console.log(data);
    if (data.type == MessageType.CONTENT) {
      console.log("content!");
      console.log(data);
      const from = await this.userRepository.findOne({ where: { id: data.from } });
      const to = await this.userRepository.findOne({ where: { id: data.to } });
      const msg = new MessageRecord({
        to: to,
        from: from,
        content: data.message,
        createdAt: new Date(data.createdAt),
        seen: data.seen,
      });
      const dbMsg = await this.messagesRepository.save(msg);
      console.log(dbMsg);

      this.subjects[data.to]?.next(dbMsg.toProtoc());
      this.subjects[data.from]?.next(dbMsg.toProtoc());

      return { type: ResponseType.OK };
    }
    if (data.type == MessageType.ACK) {
      console.log("ack!");
      console.log(data);
      const dbMsg = await this.messagesRepository.findOne({ where: { id: data.id } });

      this.subjects[dbMsg.from.id]?.next(data);
      dbMsg.seen = true;
      await this.messagesRepository.save(dbMsg);
      return { type: ResponseType.OK };
    }
    if (data.type == MessageType.TYPING_END || data.type == MessageType.TYPING_START) {
      console.log("type!");
      console.log(data);
      this.subjects[data.to]?.next(data);
      return { type: ResponseType.OK };
    }
  }

  createUpdateStream(data: Client): Observable<TextMessage> {
    const subject = new Subject<TextMessage>();
    this.subjects[data.id] = subject;

    return subject.asObservable();
  }

  async getMessages(data: Client): Promise<Response> {
    const subject = this.subjects[data.id];
    if (!subject) return { type: ResponseType.ERR };

    const msgs = await this.messagesRepository.find({
      where: [{ from: { id: data.id } }, { to: { id: data.id } }],
    });

    msgs.forEach((msg) => {
      subject.next(msg.toProtoc());
    });

    return { type: ResponseType.OK };
  }
}
