import { UpdateUserDto } from './dto/update-user.dto';
import { FindByIdParams } from './../utils/findByIdParams';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../auth/types/role.enum';
import { RolesGuard } from '../auth/guards/roles.guards';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getById(@Param() { id }: FindByIdParams) {
    const user = await this.usersService.findOneById(Number(id));
    return user;
  }

  @Get('with-address/:id')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getUserWithAddress(@Param() { id }: FindByIdParams) {
    const userWithAddress = await this.usersService.getUserWithAddress(
      Number(id),
    );
    return userWithAddress;
  }
  @Patch(':id')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUser(
    @Param() { id }: FindByIdParams,
    @Body() userData: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUser(
      userData,
      Number(id),
    );
    return updatedUser;
  }

  @Delete(':id')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUser(@Param() { id }: FindByIdParams) {
    const deleteResult = await this.usersService.deleteUser(Number(id));
    return deleteResult;
  }
}
