import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

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
}
