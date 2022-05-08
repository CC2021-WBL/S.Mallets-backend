import { Controller, Get, Param } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  async getAll() {
    const users = await this.deliveryService.getAll();
    return users;
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const delivery = await this.deliveryService.findOneById(id);
    return delivery;
  }
}
