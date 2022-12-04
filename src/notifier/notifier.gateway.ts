import { InjectRepository } from "@nestjs/typeorm";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthService } from "src/auth/auth.service";
import { Repository } from "typeorm";
import { Session } from "./entities/session.entity";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class NotifierGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService, @InjectRepository(Session) private readonly sessionRepository: Repository<Session>) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log("connected!");
  }

  async handleDisconnect(client: Socket) {
    console.log("disconnected!");
  }

  async sendNotificaiton(userId: number, message: string) {
    this.server.emit(`notify:${userId}`, message);
  }
}
