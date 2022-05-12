import { Controller, Get } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';

@Controller('orderDetails')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get()
  async getAll() {
    console.log('Show all orders!');
    return await this.orderDetailsService.getAll();
  }
}
