import * as Joi from 'joi';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AddressesModule } from './addresses/addresses.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DeliveryModule } from './delivery/delivery.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SeriesModule } from './series/series.module';
import { TranslationsModule } from './translations/translations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({ ttl: 60, limit: 20 }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME_OF_DATABASE: Joi.string().required(),
        SERVER_PORT: Joi.number(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    AddressesModule,
    DatabaseModule,
    DeliveryModule,
    OrdersModule,
    OrderDetailsModule,
    ProductsModule,
    SeriesModule,
    TranslationsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
