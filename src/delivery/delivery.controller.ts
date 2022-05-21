import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../auth/types/role.enum';
import { RolesGuard } from '../auth/guards/roles.guards';

@ApiTags('delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'All deliveries from the base',
  })
  async getAll() {
    return await this.deliveryService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Chosen delivery from the base',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.deliveryService.findOneById(id);
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'New delivery has been added to the base.',
  })
  async addDelivery(@Body() addDeliveryData: CreateDeliveryDto) {
    return await this.deliveryService.addDelivery(addDeliveryData);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateDelivery(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedDeliveryData: UpdateDeliveryDto,
  ) {
    return await this.deliveryService.updateDelivery(id, updatedDeliveryData);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteDelivery(@Param('id', ParseIntPipe) id: number) {
    return await this.deliveryService.deleteDelivery(id);
  }
}
