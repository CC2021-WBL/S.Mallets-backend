import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryRunner } from 'typeorm';

import { CreateOrderDetailsDto } from '../../order-details/dto/create-order-details.dto';
import { Order } from '../../orders/order.entity';
import { OrderDetails } from '../../order-details/order-details.entity';
import { PrepairedOrderType } from '../../orders/dto/prepaired-order';
import { Product } from '../../products/product.entity';

export async function addOrder(
  order: PrepairedOrderType,
  queryRunner: QueryRunner,
) {
  const prepairedOrder = queryRunner.manager.create(Order, order);
  const newOrder = await queryRunner.manager.save(prepairedOrder);
  if (newOrder) {
    return newOrder;
  }
  throw new HttpException(
    'Server problem with your order, contact directly with producent',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}

export async function addOrderedProduct(
  orderedProductData: CreateOrderDetailsDto,
  order: Order,
  queryRunner: QueryRunner,
) {
  const product = await queryRunner.manager.findOne(
    Product,
    orderedProductData.productId,
  );
  if (!product) {
    throw new HttpException(
      'Not found product, please contact with producent directly',
      HttpStatus.NOT_FOUND,
    );
  }
  const prepairedOrderDetails = queryRunner.manager.create(OrderDetails, {
    product: product,
    order: order,
    ...orderedProductData,
  });
  const addedOrderDetails = await queryRunner.manager.save(
    prepairedOrderDetails,
  );
  if (addedOrderDetails) {
    return addedOrderDetails;
  } else {
    throw new HttpException(
      'Error with your order',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
