import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { DevicesModule } from "./devices/devices.module";
import { EnergyConsumptionModule } from "./energy-consumption/energy-consumption.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotifierModule } from "./notifier/notifier.module";
import { RmqModule } from "./rmq/rmq.module";

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
      host: "localhost", //mysql-debug
      port: 3306,
      username: "root",
      password: "password", //admin
      database: "sd",
      autoLoadEntities: true,
      synchronize: true,
      entities: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
