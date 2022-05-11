import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Delivery } from '../delivery/delivery.entity';
import { OrderStatusTypes } from './order.entity';
import { User } from '../users/user.entity';
import { Address } from '../addresses/address.entity';

class addOrderDto {
  orderStatus: OrderStatusTypes;
  finalCostEuro: number;
  messageFromUser: string;
  delivery: Delivery;
  user: User;
  address: Address;
}

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll() {
    console.log('Show all orders!');
    return await this.orderService.getAll();
  }

  @Post()
  async addDelivery(@Body() addOrderData: addOrderDto) {
    return await this.orderService.addOrder(addOrderData);
  }
}
