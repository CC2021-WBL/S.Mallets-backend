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

  async getCurrentUserAddress(user: User) {
    if (!user.address) {
      throw new HttpException(
        `User doesn't have assigned address`,
        HttpStatus.NO_CONTENT,
      );
    } else {
      const address = this.addressRepository.findOne({
        where: { id: user.address },
      });
      if (address) {
        return address;
      }
      throw new HttpException('Not found address', HttpStatus.NOT_FOUND);
    }
  }

  async updateAddressByAddressId(id: string, addressData: UpdateAddressDto) {
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
}
