import { Controller } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { TextMessage } from "./interfaces/text-message.interface";
import { Response } from "./interfaces/post-message-response.interface";
import { MessageRecord } from "./entities/message.entity";
import { Observable, Subject } from "rxjs";
import { Client } from "./interfaces/conversation.interface";
import { Metadata, ServerDuplexStream } from "@grpc/grpc-js";
import { ResponseType } from "./interfaces/response-type.enum";

@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @GrpcMethod("GrpcMessagingService", "postMessage")
  postMessage(data: TextMessage): Response {
    return this.messagesService.postMessage(data);
  }

  @GrpcMethod("GrpcMessagingService", "getMessages")
  getMessages(data: Client): Promise<Response> {
    return this.messagesService.getMessages(data);
  }

  @GrpcMethod("GrpcMessagingService", "getUpdateStream")
  getUpdates(data: Client, metadata: Metadata, call: ServerDuplexStream<any, any>): Observable<TextMessage> {
    console.log("reached!");
    return this.messagesService.createUpdateStream(data);
  }
}
