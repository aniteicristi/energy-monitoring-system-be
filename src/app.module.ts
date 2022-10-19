import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { DevicesModule } from "./devices/devices.module";
import { EnergyConsumptionModule } from "./energy-consumption/energy-consumption.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    UsersModule,
    DevicesModule,
    EnergyConsumptionModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
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
