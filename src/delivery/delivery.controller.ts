import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

class updateDeliveryDto {
  deliveryName: string;
  deliveryArea: string;
  deliveryPrice: number;
}

class addDeliveryDto {
  deliveryName!: string;
  deliveryArea!: string;
  deliveryPrice!: number;
}

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  async getAll() {
    return await this.deliveryService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.deliveryService.findOneById(id);
  }

  @Post()
  async addDelivery(@Body() addDeliveryData: addDeliveryDto) {
    return await this.deliveryService.addDelivery(addDeliveryData);
  }

  @Patch(':id')
  async updateDelivery(
    @Param('id') id: string,
    @Body() updatedDeliveryData: updateDeliveryDto,
  ) {
    console.log(`This action updates delivery with id: ${id}`);
    return await this.deliveryService.updateDelivery(id, updatedDeliveryData);
  }
}
