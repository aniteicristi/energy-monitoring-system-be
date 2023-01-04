import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageRecord } from "./entities/message.entity";
import { User } from "src/users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MessageRecord, User])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
