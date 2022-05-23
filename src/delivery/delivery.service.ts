import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}

  async getAll() {
    const delivery = await this.deliveryRepository.find();
    if (!delivery) {
      throw new HttpException('Not found any delivery', HttpStatus.NOT_FOUND);
    }
    return delivery;
  }

  async findOneById(id: number) {
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

  async addDelivery(delivery: CreateDeliveryDto) {
    const newDelivery = await this.deliveryRepository.create(delivery);
    return await this.deliveryRepository.save(newDelivery);
  }

  async updateDelivery(id: number, delivery: UpdateDeliveryDto) {
    await this.deliveryRepository.update(id, delivery);
    return await this.deliveryRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async deleteDelivery(id: number) {
    return await this.deliveryRepository.delete(id);
  }
}
