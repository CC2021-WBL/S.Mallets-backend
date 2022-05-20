import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from './address.entity';
import { AddressUserContract } from './../contracts/addressUserContract.service';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { User } from '../users/user.entity';
import { UsersService } from './../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressesController],
  providers: [AddressesService, UsersService, AddressUserContract],
})
export class AddressesModule {}
