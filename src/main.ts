import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const microservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: "messages",
      protoPath: join(__dirname, "proto/message.proto"),
      url: "localhost:5000",
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
