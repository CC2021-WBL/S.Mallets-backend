import { Connection } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { CreateOrderDetailsDto } from './../order-details/dto/create-order-details.dto';
import { CreateOrderDto } from './../orders/dto/create-order.dto';
import { InjectConnection } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { OrderDetails } from '../order-details/order-details.entity';

@Injectable()
export class OrdersContract {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}
  async createOrder(
    orderedProducts: CreateOrderDetailsDto[],
    orderSummary: CreateOrderDto,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const addedOrderDetailsArr = orderedProducts.map(async (item) => {
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
            return addedOrderDetails;
          }
        }
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
