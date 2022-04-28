import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(product: Omit<Product, 'id'>) {
    const prodId = uuidv4();
    //creating Product instace
    const newProduct = new Product(
      prodId,
      product.prodName,
      product.description,
      product.price,
    );
    // adding product to DB - here mock - to array products
    this.products.push(newProduct);
    return prodId;
  }

  getAllProducts() {
    return [...this.products];
  }

  getSingleProduct(prodId: string) {
    const product = this.findProductById(prodId);
    return { ...product };
  }

  updateProduct(product: Product) {
    const prodFromDB = this.findProductById(product.id);
    // logic for updating product
    return product;
  }

  deleteProduct(prodId: string) {
    const prodFromDB = this.findProductById(prodId);
    //logic for deleting product
    return prodFromDB;
  }

  private findProductById(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('could not find product');
    }
    return product;
  }
}
