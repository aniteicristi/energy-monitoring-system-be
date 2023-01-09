import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { DevicesModule } from "./devices/devices.module";
import { EnergyConsumptionModule } from "./energy-consumption/energy-consumption.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotifierModule } from "./notifier/notifier.module";
import { RmqModule } from "./rmq/rmq.module";
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    UsersModule,
    DevicesModule,
    EnergyConsumptionModule,
    AuthModule,
    NotifierModule,
    RmqModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "mysql-debug", //localhost
      port: 3306,
      username: "root",
      password: "admin", //password
      database: "sd",
      autoLoadEntities: true,
      synchronize: true,
      entities: [],
    }),
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
