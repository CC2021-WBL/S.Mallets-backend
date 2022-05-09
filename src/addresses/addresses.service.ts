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
    console.log(user.address);
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
}
