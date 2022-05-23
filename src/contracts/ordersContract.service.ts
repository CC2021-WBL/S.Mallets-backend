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

@Injectable()
export class OrdersContract {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}
  async createOrder(
    orderedProducts: CreateOrderDetailsDto[],
    orderSummary: CreateOrderDto,
    userId: string,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let finalPrice = 0;
    try {
      const chosenDelivery = await queryRunner.manager.findOneOrFail(
        Delivery,
        orderSummary.deliveryId,
      );
      const OrderDetPromises = orderedProducts.map(async (item) => {
        const product = await queryRunner.manager.findOne(
          Product,
          item.productId,
        );

        if (product) {
          const prepairedOrderDetails = queryRunner.manager.create(
            OrderDetails,
            {
              product: product,
              ...item,
            },
          );
          const addedOrderDetails = await queryRunner.manager.save(
            prepairedOrderDetails,
          );
          if (addedOrderDetails) {
            finalPrice += addedOrderDetails.quantity * product.price;
            return addedOrderDetails;
          }
        }
      });
      const addedOrderDetails: OrderDetails[] = [];
      OrderDetPromises.forEach((promise) => {
        Promise.resolve(promise).then((value) => addedOrderDetails.push(value));
      });
      const order = queryRunner.manager.create(Order, {
        finalCostEuro: finalPrice,
        delivery: chosenDelivery,
        orderDetails: addedOrderDetails,
        ...orderSummary,
      });
      const addedOrder = await queryRunner.manager.save(Order, order);
      if (userId) {
        const user = await queryRunner.manager.findOne(User, userId);
        user.orders.push(addedOrder);
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
