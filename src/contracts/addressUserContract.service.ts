import { Connection } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Address } from '../addresses/address.entity';
import { AddressesService } from './../addresses/addresses.service';
import { CreateAddressDto } from '../addresses/dto/create-address.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AddressUserContract {
  constructor(
    private readonly connection: Connection,
    private readonly usersService: UsersService,
  ) {}

  async createAddress(address: CreateAddressDto, userId: string) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const prepairedAddress = queryRunner.manager.create(Address, address);
      const addedAddress = await queryRunner.manager.save(prepairedAddress);
      const isUserUpdated = await queryRunner.manager.update(
        User,
        {
          id: userId,
        },
        { address: addedAddress },
      );
      if (isUserUpdated) {
        await queryRunner.commitTransaction();
        return addedAddress;
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Creating failed', HttpStatus.PARTIAL_CONTENT);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteAddress(userId: string) {
    const queryRunner = this.connection.createQueryRunner();

    const user = await this.usersService.getUserWithAddress(userId);
    const addressId = user.address?.id;
    if (addressId) {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        await queryRunner.manager.update(
          User,
          { id: userId },
          { address: null },
        );
        await queryRunner.manager.delete(Address, addressId);
        await queryRunner.commitTransaction();
        return true;
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(
          'Seletion failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } finally {
        await queryRunner.release();
      }
    } else {
      throw new HttpException(
        'Not found address for that user',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
