import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Session } from "./entities/session.entity";
import { NotifierGateway } from "./notifier.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([Session]), AuthModule],
  providers: [NotifierGateway],
  exports: [NotifierGateway],
})
export class NotifierModule {}
