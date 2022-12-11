import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // const microservice = app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ["amqp://localhost:5672"],
  //     queue: "device_consumption",
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
