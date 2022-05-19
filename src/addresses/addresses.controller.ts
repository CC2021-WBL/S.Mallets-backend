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
import { AddressUserContract } from './../contracts/addressUserContract.service';
import { User } from '../users/user.entity';
@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly addressUserContract: AddressUserContract,
  ) {}
  @Post()
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

  @Patch()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateAddress(
    @Req() req: RequestWithUser,
    @Body() addressData: UpdateAddressDto,
  ) {
    if (Object.keys(addressData).length === 0) {
      throw new HttpException('No content', HttpStatus.NO_CONTENT);
    }
    this.checkIfUserHasAddress(req.user);
    const updatedAddress = await this.addressesService.updateAddressByAddressId(
      req.user.address.id,
      addressData,
    );
    return updatedAddress;
  }

  @Get()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAddress(@Req() req: RequestWithUser) {
    this.checkIfUserHasAddress(req.user);
    const userAddress = await this.addressesService.getCurrentUserAddress(
      req.user.address.id,
    );
    return userAddress;
  }

  @Delete()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteAddress(@Req() req: RequestWithUser) {
    this.checkIfUserHasAddress(req.user);
    const isAddressDeleted = await this.addressUserContract.deleteAddress(
      req.user.id,
    );
    return isAddressDeleted;
  }

  // -------------------------------------- ADMIN-ROUTES--------------------------------------------------------

  @Post('admin/:userId')
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async createAddressByAdmin(
    @Param('userId') userId: string,
    @Body() addressData: CreateAddressDto,
  ) {
    const addedAddress = this.addressUserContract.createAddress(
      addressData,
      userId,
    );
    return addedAddress;
  }

  @Patch('admin/:addressId')
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async updateAddressByAdmin(
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

  @Get('admin/:addressId')
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async getAddressByAdmin(@Param('addressId') addressId: string) {
    const userAddress = await this.addressesService.getCurrentUserAddress(
      addressId,
    );
    return userAddress;
  }

  @Delete('admin/:userId')
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteAddressByAdmin(@Param('userId') userId: string) {
    const isAddressDeleted = await this.addressUserContract.deleteAddress(
      userId,
    );
    return isAddressDeleted;
  }

  // --------------------------------PRIV-METHODS----------------------------------------------------------

  private checkIfUserHasAddress(user: User) {
    if (!user.address.id) {
      throw new HttpException(
        "User doesn't have addrress",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
