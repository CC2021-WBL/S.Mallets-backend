import 'reflect-metadata';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

// const allowed = []
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    // methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    // allowedHeaders: [
    //   'Content-Type',
    //   'Authorization',
    //   'Cookie',
    //   'X-CSRF-Token',
    //   'X-Requested-With',
    //   'Accept',
    //   'Accept-Version',
    //   'Content-Length',
    //   'Content-MD5',
    //   'Date',
    //   'X-Api-Version',
    // ],
    // exposedHeaders: ['Set-Cookie'],
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const options = new DocumentBuilder()
    .setTitle('s.mallets API')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT') || 3030;
  await app.listen(port);
}
bootstrap();
