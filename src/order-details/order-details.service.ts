import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getAll() {
    console.log('Show all ways of delivery');
    const delivery = await this.orderRepository.find();
    if (!delivery) {
      throw new HttpException('Not found any delivery', HttpStatus.NOT_FOUND);
    }
    return delivery;
  }

  async addOrder(order: Omit<Order, 'id' | 'createdAt' | 'modifiedAt'>) {
    const prepairedOrder = await this.orderRepository.create(order);
    const addedOrder = await this.orderRepository.save(prepairedOrder);
    return addedOrder;
  }
}
