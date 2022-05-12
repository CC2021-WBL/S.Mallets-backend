import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './order-details.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async getAll() {
    console.log('Show all order details');
    const delivery = await this.orderDetailsRepository.find();
    if (!delivery) {
      throw new HttpException(
        'Not found any order details',
        HttpStatus.NOT_FOUND,
      );
    }
    return delivery;
  }
}
