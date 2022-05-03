import { Controller, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    const users = await this.usersService.getAll();
    return users;
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const user = await this.usersService.findOneById(id);
    return user;
  }
}
