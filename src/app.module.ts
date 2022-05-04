import * as Joi from 'joi';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AddressesController } from './addresses/addresses.controller';
import { AddressesModule } from './addresses/addresses.module';
import { AddressesService } from './addresses/addresses.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { RolesGuard } from './auth/guards/roles.guards';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({ ttl: 60, limit: 20 }),
    OrdersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_HOST_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME_OF_DATABASE: Joi.string().required(),
        SERVER_PORT: Joi.number(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        PUB_KEY: Joi.string().required(),
        PRIV_KEY: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    AddressesModule,
    DatabaseModule,
  ],
  controllers: [AppController, AddressesController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AddressesService,
  ],
})
export class AppModule {}
