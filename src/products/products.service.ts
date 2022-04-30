import { Product } from './product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addProduct(product: Omit<Product, 'id'>) {
    const prepairedProduct = await this.productRepository.create(product);
    const addedProduct = await this.productRepository.save(prepairedProduct);
    return addedProduct;
  }

  async getAllProducts() {
    return this.productRepository.find();
  }

  async getSingleProduct(prodId: number) {
    const product = this.findProductById(prodId);
    return { ...product };
  }

  // TODO: it should be updated
  async updateProduct(product: Product) {
    const prodFromDB = await this.findProductById(product.id);
    console.log(prodFromDB);
    // logic for updating product
    return product;
  }

  private async findProductById(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('could not find product');
    }
    return product;
  }
}
