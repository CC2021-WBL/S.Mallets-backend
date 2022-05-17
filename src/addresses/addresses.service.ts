import { UpdateAddressDto } from './dto/update-address.dto';
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

  async getCurrentUserAddress(addressId: string) {
    const address = await this.addressRepository.findOne({
      where: { id: addressId },
    });
    console.log(address);
    if (address) {
      return address;
    }
    throw new HttpException('Not found address', HttpStatus.NOT_FOUND);
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
