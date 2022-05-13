import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('delivery')
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
  async addDelivery(@Body() addDeliveryData: CreateDeliveryDto) {
    return await this.deliveryService.addDelivery(addDeliveryData);
  }

  @Patch(':id')
  async updateDelivery(
    @Param('id') id: string,
    @Body() updatedDeliveryData: UpdateDeliveryDto,
  ) {
    console.log(`This action updates delivery with id: ${id}`);
    return await this.deliveryService.updateDelivery(id, updatedDeliveryData);
  }
}
