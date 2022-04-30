import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Role } from 'src/auth/types/role.enum';
import { Roles } from 'src/decorators/roles.decorators';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.Admin)
  addProduct(
    @Body('productName') productName: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const addedProductId = this.productsService.addProduct({
      productName: productName,
      description: description,
      price: price,
    });
    return { prodId: addedProductId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':prodId')
  getProduct(@Param('prodId') prodId: number) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':prodId')
  @Roles(Role.Admin)
  updateProduct(
    @Param('prodId') prodId: number,
    @Body('productName') productName: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const updatedProduct = this.productsService.updateProduct({
      id: prodId,
      productName: productName,
      description: description,
      price: price,
    });
    return updatedProduct;
  }

  @Delete(':prodId')
  @Roles(Role.Admin)
  deleteProduct(@Param('prodId') prodId: number) {
    const deletedProduct = this.productsService.deleteProduct(prodId);
    return deletedProduct;
  }
}
