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

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(MessageRecord) private messagesRepository: Repository<MessageRecord>) {}

  subjects: Record<number, Subject<TextMessage>> = {};

  postMessage(data: TextMessage): Response {
    throw new Error("Method not implemented.");
  }

  createUpdateStream(data: Client): Observable<TextMessage> {
    const subject = new Subject<TextMessage>();

    this.subjects[data.id] = subject;

    return subject.asObservable();
  }

  async getMessages(data: Client): Promise<Response> {
    const subject = this.subjects[data.id];
    subject.next({
      type: MessageType.CONTENT,
      to: data.id,
      from: 8,
      message: "Hello my dude x2",
      createdAt: new Date().toISOString(),
      seen: true,
    });

    return { type: ResponseType.OK };
  }
}
