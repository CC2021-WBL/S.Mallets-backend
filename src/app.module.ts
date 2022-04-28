import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
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
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
