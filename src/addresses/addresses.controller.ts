import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AddressesService } from './addresses.service';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../auth/types/role.enum';
import { RolesGuard } from '../auth/guards/roles.guards';
import RequestWithUser from '../auth/types/requestWithUser.interface';
import { AddressUserContract } from '../contracts/AddressUserContract.service';

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
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
  // @Roles(Role.User)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async updateAddress(
    @Param('addressId') addressId: string,
    @Body() addressData: UpdateAddressDto,
  ) {
    if (Object.keys(addressData).length === 0) {
      throw new HttpException('No content', HttpStatus.NO_CONTENT);
    }
    const updatedAddress = await this.addressesService.updateAddressByAddressId(
      addressId,
      addressData,
    );
    return updatedAddress;
  }

  @Get('get/:addressId')
  // @Roles(Role.User)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async getAddress(@Param('addressId') addressId: string) {
    console.log(addressId);
    const userAddress = await this.addressesService.getCurrentUserAddress(
      addressId,
    );
    console.log(userAddress);
    return userAddress;
  }

  @Delete(':addressId')
  // @Roles(Role.User)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteAddress(@Param(':addressId') addressId: string) {
    const isAddressDeleted = await this.addressUserContract.deleteAddress(
      addressId,
    );
    return isAddressDeleted;
  }
}
