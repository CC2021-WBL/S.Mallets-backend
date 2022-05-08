import {
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './delivery.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}

  async getAll() {
    console.log('Show all ways of delivery');
    const delivery = await this.deliveryRepository.find();
    if (!delivery) {
      throw new HttpException('Not found any delivery', HttpStatus.NOT_FOUND);
    }
    return delivery;
  }

  async findOneById(id: string) {
    const delivery = await this.deliveryRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!delivery) {
      throw new HttpException(
        `Not found delivery with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return delivery;
  }

  async addDelivery(
    delivery: Omit<Delivery, 'id' | 'createdAt' | 'modifiedAt'>,
  ) {
    const prepairedDelivery = await this.deliveryRepository.create(delivery);
    const addedDelivery = await this.deliveryRepository.save(prepairedDelivery);
    return addedDelivery;
  }

  async updateDelivery(
    id,
    delivery: Omit<Delivery, 'id' | 'createdAt' | 'modifiedAt'>,
  ) {
    return await this.deliveryRepository.update(id, delivery);
  }
}
