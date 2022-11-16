import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RabbitMQController } from "./rabbitmq.controller";
import { RabbitMQService } from "./rabbitmq.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "QUEUE_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"],
          queue: "device_consumption",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [RabbitMQController],
  providers: [RabbitMQService],
})
export class RabbitMQModule {}
