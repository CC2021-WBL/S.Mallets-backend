import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
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
import { AddressUserContract } from '../contracts/AddressUserContract.service';

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly usersService: UsersService,
    private readonly addressUserContract: AddressUserContract,
  ) {}
  @Post('add')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createAddress(
    @Req() req: RequestWithUser,
    @Body() addressData: CreateAddressDto,
  ) {
    const addedAddress = this.addressUserContract.createAddress(
      addressData,
      req.user.id,
    );
    return addedAddress;
  }

  @Patch(':addressId')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateAddress(
    @Param('addressId') addressId: string,
    @Body() addressData: UpdateAddressDto,
  ) {
    const updatedAddress = await this.addressesService.updateAddressByAddressId(
      addressId,
      addressData,
    );
    return updatedAddress;
  }

  @Get('get')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAddress(@Req() req: RequestWithUser) {
    const userAddress = await this.addressesService.getCurrentUserAddress(
      req.user,
    );
    return userAddress;
  }

  @Delete()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteAddress(@Req() req: RequestWithUser) {
    const isAddressDeleted = await this.addressUserContract.deleteAddress(
      req.user.id,
    );
    return isAddressDeleted;
  }
}
