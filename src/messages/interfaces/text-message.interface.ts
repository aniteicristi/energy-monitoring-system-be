import { MessageType } from "./message-type.enum";

export interface TextMessage {
  type: MessageType;
  to: number;
  from: number;
  message: string;
  createdAt: string;
  seen: boolean;
  id: number;
}
