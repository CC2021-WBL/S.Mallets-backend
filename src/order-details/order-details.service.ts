import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './order-details.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
  ) {}
}
