import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';

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

  @Patch(':id/order-status')
  async changeOrderStatus(@Param('id') id: string) {
    return await this.ordersService.changeOrderStatus(id);
  }

  @Patch(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updatedOrderData: UpdateOrderDto,
  ) {
    console.log(`Delivery with id: ${id} has been updated.`);
    return await this.ordersService.updateOrder(id, updatedOrderData);
  }
}
