import { Module } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessagesController } from "./messages.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageRecord } from "./entities/message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MessageRecord])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
