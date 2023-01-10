import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { join } from "path";
import { readFileSync } from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key:  readFileSync('./secrets/localhost.key'),
      cert: readFileSync('./secrets/localhost.crt'),
    }
  });
  app.enableCors();
  const microservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: "messages",
      protoPath: join(__dirname, "proto/message.proto"),
      url: "hrm_api_dev:5000", //localhost
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
