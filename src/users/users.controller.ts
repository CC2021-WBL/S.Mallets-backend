import { UpdateUserDto } from './dto/update-user.dto';
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
  Req,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../auth/types/role.enum';
import { RolesGuard } from '../auth/guards/roles.guards';
import { ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../auth/types/requestWithUser.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getById(@Req() req: RequestWithUser) {
    const user = await this.usersService.findOneById(req.user.id);
    return user;
  }

  @Get('with-address')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserWithAddress(@Req() req: RequestWithUser) {
    const userWithAddress = await this.usersService.getUserWithAddress(
      req.user.id,
    );
    userWithAddress.hash = undefined;
    return userWithAddress;
  }
  @Get('orders')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async getUsersOrders(@Req() req: RequestWithUser) {
    const usersOrders = await this.usersService.getUserWithOrders(req.user.id);
    return usersOrders;
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    if (Object.keys(userData).length === 0) {
      throw new HttpException('No content', HttpStatus.NO_CONTENT);
    }
    const updatedUser = await this.usersService.updateUser(userData, id);
    return updatedUser;
  }

  @Delete()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Req() req: RequestWithUser) {
    const deleteResult = await this.usersService.deleteUser(req.user.id);
    return deleteResult;
  }

  //----------------------------------------------------ADMIN-ROUTES----------------------------------------------------------

  @Get('admin/:userId')
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async getAsAdminById(@Param('userId') userId: string) {
    const user = await this.usersService.findOneById(userId);
    return user;
  }

  @Get('admin/with-address/:id')
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async getAsAdminUserWithAddress(@Param('id') id: string) {
    const userWithAddress = await this.usersService.getUserWithAddress(id);
    userWithAddress.hash = undefined;
    return userWithAddress;
  }

  @Patch('admin/:userId')
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUserAsAdmin(
    @Param('userId') userId: string,
    @Body() userData: UpdateUserDto,
  ) {
    if (Object.keys(userData).length === 0) {
      throw new HttpException('No content', HttpStatus.NO_CONTENT);
    }
    const updatedUser = await this.usersService.updateUser(userData, userId);
    return updatedUser;
  }

  @Delete('admin/:userId')
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUserByAdmin(@Param('userId') userId: string) {
    const deleteResult = await this.usersService.deleteUser(userId);
    return deleteResult;
  }
}
