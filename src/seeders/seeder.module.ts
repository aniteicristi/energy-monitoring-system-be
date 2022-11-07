import { SeederService } from "./seeder.service";
import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { DevicesModule } from "src/devices/devices.module";
import { EnergyConsumptionModule } from "src/energy-consumption/energy-consumption.module";
import { UsersModule } from "src/users/users.module";

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
  providers: [SeederService, Logger],
})
export class SeederModule {}
