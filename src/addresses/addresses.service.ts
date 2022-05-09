import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from './../users/user.entity';
import { Address } from './address.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async createAddress(address: CreateAddressDto): Promise<Address> {
    const prepairedAddress = await this.addressRepository.create(address);
    const addedAddress = await this.addressRepository.save(prepairedAddress);
    if (addedAddress) {
      return addedAddress;
    }
    throw new HttpException('Invalid data', HttpStatus.PARTIAL_CONTENT);
  }

  async getCurrentUserAddress(user: User) {
    if (!user.address) {
      throw new HttpException(
        `User doesn't have assigned address`,
        HttpStatus.NO_CONTENT,
      );
    } else {
      console.log(user.address);
      const address = this.addressRepository.findOne({
        where: { id: user.address },
      });
      if (address) {
        return address;
      }
      throw new HttpException('Not found address', HttpStatus.NOT_FOUND);
    }
  }

  async updateAddressByAddressId(id: number, addressData: UpdateAddressDto) {
    const updatedAddress = await this.addressRepository
      .createQueryBuilder()
      .update()
      .set(addressData)
      .where('id = :id', { id: id })
      .returning('*')
      .execute()
      .then((response) => {
        return response.raw[0];
      });
    if (!updatedAddress) {
      throw new HttpException('Updating failed', HttpStatus.BAD_REQUEST);
    }
    return updatedAddress;
  }

  async deleteAddress(id: number) {
    const deletedAddress = await this.addressRepository
      .createQueryBuilder()
      .delete()
      .from(Address)
      .where('id = :id', { id: id })
      .returning('*')
      .execute()
      .then((response) => {
        return response.raw[0];
      });

    if (!deletedAddress) {
      throw new HttpException(
        'Deletion failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return deletedAddress;
  }
}
