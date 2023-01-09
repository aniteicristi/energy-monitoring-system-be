import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { Module } from "@nestjs/common";
import { EnergyConsumptionModule } from "src/energy-consumption/energy-consumption.module";
import { RmqService } from "./rmq.service";

@Module({
  imports: [
    EnergyConsumptionModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: "amqp://rabbitmq:5672", //localhost
    }),
    RmqModule,
  ],
  controllers: [],
  providers: [RmqService],
})
export class RmqModule {}
