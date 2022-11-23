import { Server } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { AuthService } from "src/auth/auth.service";
import { Repository } from "typeorm";
import { Session } from "./entities/session.entity";

@WebSocketGateway(80, {
  cors: {
    origin: "*",
  },
})
export class NotifierGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly authService: AuthService, @InjectRepository(Session) private readonly sessionRepository: Repository<Session>) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const user = this.authService.getUserDataFromToken(client.handshake.headers.authorization.replace("Bearer ", ""));

    const sesh = new Session({
      socketId: client.id,
      userId: user["id"],
    });
    await this.sessionRepository.save(sesh);
  }

  async handleDisconnect(client: Socket) {
    const user = this.authService.getUserDataFromToken(client.handshake.headers.authorization.replace("Bearer ", ""));
    await this.sessionRepository.delete(user["id"]);
  }

  async sendNotificaiton() {}
}
