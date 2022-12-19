import { Controller } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { GrpcMethod } from "@nestjs/microservices";
import { TextMessage } from "./interfaces/text-message.interface";
import { PostMessageResponse } from "./interfaces/post-message-response.interface";
import { MessageRecord } from "./entities/message.entity";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @GrpcMethod("GrpcMessagingService", "postMessage")
  postMessage(data: TextMessage): PostMessageResponse {
    return this.messagesService.postMessage(data);
  }
}
