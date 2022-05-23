import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../auth/types/role.enum';
import { RolesGuard } from '../auth/guards/roles.guards';
import { OrdersContract } from '../contracts/ordersContract.service';
import RequestWithUser from '../auth/types/requestWithUser.interface';
import { Order } from './order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly ordersContract: OrdersContract,
  ) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAll() {
    return await this.ordersService.getAll();
  }

  @Get(':id')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getSingleOrder(@Param('id') id: string) {
    return await this.ordersService.getSingleOrder(id);
  }

  @Post()
  async addOrder(@Body() addOrderData: CreateOrderDto) {
    let readyOrder: Order;
    if (addOrderData.userId) {
      readyOrder = await this.ordersContract.createOrder(
        addOrderData,
        addOrderData.userId,
      );
    } else {
      readyOrder = await this.ordersContract.createOrder(addOrderData);
    }
    return readyOrder;
  }

  @Patch(':id/order-status')
  async changeOrderStatus(@Param('id') id: string) {
    return await this.ordersService.changeOrderStatus(id);
  }

  // @Patch(':id')
  // async updateOrder(
  //   @Param('id') id: string,
  //   @Body() updatedOrderData: UpdateOrderDto,
  // ) {
  //   console.log(`Order with id: ${id} has been updated.`);
  //   return await this.ordersService.updateOrder(id, updatedOrderData);
  // }
}
