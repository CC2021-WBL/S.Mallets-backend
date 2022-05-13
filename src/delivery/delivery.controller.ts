import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
    console.log(`New way of delivery has been added.`);
    return await this.deliveryService.addDelivery(addDeliveryData);
  }

  @Patch(':id')
  async updateDelivery(
    @Param('id') id: string,
    @Body() updatedDeliveryData: UpdateDeliveryDto,
  ) {
    console.log(`Delivery with id: ${id} has been updated.`);
    return await this.deliveryService.updateDelivery(id, updatedDeliveryData);
  }

  @Delete(':id')
  async deleteDelivery(@Param('id') id: string) {
    console.log(`Delivery with id: ${id} has been deleted.`);
    return await this.deliveryService.deleteDelivery(id);
  }
}
