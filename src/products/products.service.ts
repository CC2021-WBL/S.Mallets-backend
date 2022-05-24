import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addProduct(product: CreateProductDto) {
    const prepairedProduct = await this.productRepository.create(product);
    const addedProduct = await this.productRepository.save(prepairedProduct);
    return addedProduct;
  }

  async getAllProducts() {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productDescription', 'description')
      .leftJoinAndSelect('product.productAltText', 'alt')
      .getMany();
    if (products) {
      return products;
    }
    throw new HttpException('Something went wrong', HttpStatus.NOT_FOUND);
  }

  async getSingleProduct(prodId: number) {
    const product = await this.findProductById(prodId);
    return { ...product };
  }

  async updateProduct(prodId: number, productData: UpdateProductDto) {
    const product = await this.findProductById(prodId);
    for (const key in productData) {
      if (Object.prototype.hasOwnProperty.call(productData, key)) {
        product[key] = productData[key];
      }
    }
    const updatedUser = await this.productRepository.save(product);
    if (!updatedUser) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Updating user failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return updatedUser;
  }

  private async findProductById(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('could not find product');
    }
    return product;
  }
}
