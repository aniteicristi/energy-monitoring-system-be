import { Injectable } from "@nestjs/common";
import { TextMessage } from "./interfaces/text-message.interface";
import { PostMessageResponse } from "./interfaces/post-message-response.interface";

@Injectable()
export class MessagesService {
  postMessage(data: TextMessage): PostMessageResponse {
    throw new Error("Method not implemented.");
  }
}
