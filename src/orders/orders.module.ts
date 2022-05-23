import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Delivery } from '../delivery/delivery.entity';
import { Order } from './order.entity';
import { OrderDetails } from '../order-details/order-details.entity';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrdersContract } from '../contracts/ordersContract.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Product } from '../products/product.entity';
import { ProductsService } from '../products/products.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Delivery, Product, OrderDetails, User]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrdersContract,
    OrderDetailsService,
    ProductsService,
    UsersService,
  ],
})
export class OrdersModule {}
