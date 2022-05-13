import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll() {
    console.log('Show all orders!');
    return await this.orderService.getAll();
  }

  @Post()
  async addOrder(@Body() addOrderData: CreateOrderDto) {
    return await this.orderService.addOrder(addOrderData);
  }
}
