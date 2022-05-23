import { User } from './../users/user.entity';
import { Connection } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { CreateOrderDto } from '../orders/dto/create-order.dto';
import { InjectConnection } from '@nestjs/typeorm';
import { OrderDetails } from '../order-details/order-details.entity';
import { Delivery } from '../delivery/delivery.entity';
import { UsersService } from '../users/users.service';
import { addOrder, addOrderedProduct } from './tools/orderContract.components';

@Injectable()
export class OrdersContract {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly usersService: UsersService,
  ) {}
  async createOrder(orderSummary: CreateOrderDto, userId?: string) {
    const queryRunner = this.connection.createQueryRunner();

    let user: User | null = null;
    if (userId) {
      const gettedUser = await this.usersService.getUserWithOrders(userId);
      user = gettedUser;
    }

    await queryRunner.connect();
    await queryRunner.startTransaction();

    let finalPrice = 0;

    try {
      const chosenDelivery = await queryRunner.manager.findOneOrFail(
        Delivery,
        orderSummary.deliveryId,
      );

      const addedOrder = await addOrder(
        {
          finalCostEuro: finalPrice,
          delivery: chosenDelivery,
          user: user,
          ...orderSummary,
        },
        queryRunner,
      );
      const orderDetails: OrderDetails[] = [];
      for (const item of orderSummary.orderedProducts) {
        const addedOrderDetails = await addOrderedProduct(
          item,
          addedOrder,
          queryRunner,
        );

        if (addedOrderDetails) {
          finalPrice +=
            addedOrderDetails.quantity * addedOrderDetails.product.price;
          orderDetails.push(addedOrderDetails);
        }
      }
      addedOrder.orderDetails = orderDetails;
      addedOrder.finalCostEuro = finalPrice;
      const updatedOrder = await queryRunner.manager.save(addedOrder);

      if (user) {
        await queryRunner.manager
          .createQueryBuilder()
          .relation(User, 'orders')
          .of(user.id)
          .add(updatedOrder.id);
      }

      await queryRunner.commitTransaction();
      return updatedOrder;
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new HttpException(error.Message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
