import { ProductsService } from './../products/products.service';
import { CreateOrderDetailsDto } from './dto/create-order-details.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './order-details.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    private readonly productSercvice: ProductsService,
  ) {}

  async addOrderedProduct(orderedProductData: CreateOrderDetailsDto) {
    const product = await this.productSercvice.getSingleProduct(
      orderedProductData.productId,
    );
    if (product) {
      const prepairedOrderDetails = this.orderDetailsRepository.create({
        product: product,
        ...orderedProductData,
      });
      const addedOrderDetails = await this.orderDetailsRepository.save(
        prepairedOrderDetails,
      );
      if (addedOrderDetails) {
        return addedOrderDetails;
      } else {
        throw new HttpException(
          'Error with your order',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    throw new HttpException(
      'Not found product, please contact with producent directly',
      HttpStatus.NOT_FOUND,
    );
  }
}
