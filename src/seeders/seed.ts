import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { exit } from 'process';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);

  const seeder = await appContext.get(SeederService);
  const logger = await appContext.get(Logger);

  try {
    logger.debug('Seeding database...');
    await seeder.seed();
    logger.debug('Seeded database!');
  } catch (error) {
    logger.error(`Failed to seed database! This was caused by: ${error}`);
    exit(-1);
  }
  exit(0);
}
bootstrap();
