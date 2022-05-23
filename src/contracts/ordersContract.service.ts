import { OrderDetailsService } from './../order-details/order-details.service';
import { Connection } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { CreateOrderDetailsDto } from './../order-details/dto/create-order-details.dto';
import { CreateOrderDto } from './../orders/dto/create-order.dto';
import { InjectConnection } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { OrderDetails } from '../order-details/order-details.entity';
import { Delivery } from '../delivery/delivery.entity';
import { Order } from '../orders/order.entity';
import { User } from '../users/user.entity';
import { reduceToEntityFields } from '../orders/utils/orderObjectTools';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class OrdersContract {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly ordersService: OrdersService,
  ) {}
  async createOrder(orderSummary: CreateOrderDto, userId?: string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let finalPrice = 0;
    try {
      const chosenDelivery = await queryRunner.manager.findOneOrFail(
        Delivery,
        orderSummary.deliveryId,
      );
      const orderDetails: OrderDetails[] = [];
      for (const item of orderSummary.orderedProducts) {
        const addedOrderDetails =
          await this.orderDetailsService.addOrderedProduct(item);

        if (addedOrderDetails) {
          finalPrice +=
            addedOrderDetails.quantity * addedOrderDetails.product.price;
          orderDetails.push(addedOrderDetails);
        }
      }
      const order = reduceToEntityFields(orderSummary);
      const addedOrder = await this.ordersService.addOrder({
        finalCostEuro: finalPrice,
        delivery: chosenDelivery,
        orderDetails: orderDetails,
        ...order,
      });

      if (userId) {
        const user = await queryRunner.manager.findOne(User, userId);
        user.orders.push(addedOrder);
        await queryRunner.manager.save(user);
      }
      return addedOrder;
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new HttpException(error.Message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
