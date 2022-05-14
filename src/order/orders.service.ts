import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, OrderStatusTypes } from './dto/create-order.dto';
import { UpdateDeliveryDto } from '../delivery/dto/update-delivery.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async getAll() {
    console.log('Show all ways of delivery');
    const delivery = await this.ordersRepository.find();
    if (!delivery) {
      throw new HttpException('Not found any delivery', HttpStatus.NOT_FOUND);
    }
    return delivery;
  }

  async addOrder(order: CreateOrderDto) {
    const newOrder = await this.ordersRepository.create(order);
    return await this.ordersRepository.save(newOrder);
  }

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
