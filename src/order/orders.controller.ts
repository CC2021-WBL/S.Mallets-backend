import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAll() {
    console.log('Show all orders!');
    return await this.ordersService.getAll();
  }

  @Post()
  async addOrder(@Body() addOrderData: CreateOrderDto) {
    return await this.ordersService.addOrder(addOrderData);
  }
}
