import { FindByUserIdParams } from './../utils/findByIdParams';
import { CreateAddressDto } from './dto/create-address.dto';
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

import { AddressesService } from './addresses.service';
import { UsersService } from './../users/users.service';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../auth/types/role.enum';
import { RolesGuard } from '../auth/guards/roles.guards';
import RequestWithUser from '../auth/types/requestWithUser.interface';

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly usersService: UsersService,
  ) {}
  @Post('add/:userId')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createAddress(
    @Param() { userId }: FindByUserIdParams,
    @Body() addressData: CreateAddressDto,
  ) {
    const addedAddress = await this.addressesService.createAddress(addressData);
    await this.usersService.addAddressToUser(Number(userId), addedAddress);
    return addedAddress;
  }

  //   @Patch()
  //   @Roles(Role.User)
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   async updateAddress() {}

  @Get('get')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAddress(@Req() req: RequestWithUser) {
    const userAddress = await this.addressesService.getCurrentUserAddress(
      req.user,
    );
    return userAddress;
  }

  //   @Delete()
  //   @Roles(Role.User)
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   async getAddress() {}
}
