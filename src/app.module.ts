import 'dotenv/config';

import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Address } from './addresses/address.entity';
import { AddressesController } from './addresses/addresses.controller';
import { AddressesModule } from './addresses/addresses.module';
import { AddressesService } from './addresses/addresses.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { RolesGuard } from './auth/guards/roles.guards';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST_NAME,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_OF_DATABASE,
  autoLoadEntities: true,
  entities: [User, Address],
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot({ ttl: 60, limit: 20 }),
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(config),
    AddressesModule,
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
