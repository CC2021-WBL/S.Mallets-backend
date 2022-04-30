import 'reflect-metadata';

import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(helmet());
  const configService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT');
  await app.listen(port);
}
bootstrap();
