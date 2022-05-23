import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderStatusTypes } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrepairedOrderType } from './dto/prepaired-order';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async getAll() {
    const orders = await this.ordersRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.orderDetails', 'orderDetails')
      .getMany();
    if (!orders) {
      throw new HttpException('Not found any orders', HttpStatus.NOT_FOUND);
    }
    return orders;
  }

  async getSingleOrder(id: string) {
    const order = await this.ordersRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.orderDetails', 'orderDetails')
      .where({ id: id })
      .getOne();
    if (!order) {
      throw new HttpException('Not found current order', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async addOrder(order: PrepairedOrderType): Promise<Order> {
    const prepairedOrder = await this.ordersRepository.create(order);
    const newOrder = await this.ordersRepository.save(prepairedOrder);
    if (newOrder) {
      return newOrder;
    }
    throw new HttpException(
      'Server problem with your order, contact directly with producent',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  // async updateOrder(id, order: UpdateOrderDto) {
  //   await this.ordersRepository.update(id, order);
  //   return await this.ordersRepository.findOne({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }

  async changeOrderStatus(id) {
    const order = await this.ordersRepository.findOne({
      where: {
        id: id,
      },
    });
    const { orderStatus } = order;
    switch (orderStatus) {
      case OrderStatusTypes.WAITING_FOR_PAYMENT:
        await this.ordersRepository.update(id, {
          orderStatus: OrderStatusTypes.PROCESSING_TIME,
        });
        break;
      case OrderStatusTypes.PROCESSING_TIME:
        await this.ordersRepository.update(id, {
          orderStatus: OrderStatusTypes.READY_FOR_SHIPMENT,
        });
        break;
      case OrderStatusTypes.READY_FOR_SHIPMENT:
        await this.ordersRepository.update(id, {
          orderStatus: OrderStatusTypes.DELIVERY_IN_PROGRESS,
        });
        break;
      case OrderStatusTypes.DELIVERY_IN_PROGRESS:
        await this.ordersRepository.update(id, {
          orderStatus: OrderStatusTypes.WAITING_FOR_PAYMENT,
        });
        break;
      default:
        break;
    }
    return await this.ordersRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
