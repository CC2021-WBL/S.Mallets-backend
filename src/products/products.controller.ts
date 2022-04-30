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
    @Body('prodName') prodName: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const addedProductId = this.productsService.addProduct({
      prodName: prodName,
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
  getProduct(@Param('prodId') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':prodId')
  @Roles(Role.Admin)
  updateProduct(
    @Param('prodId') prodId: string,
    @Body('prodName') prodName: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const updatedProduct = this.productsService.updateProduct({
      id: prodId,
      prodName: prodName,
      description: description,
      price: price,
    });
    return updatedProduct;
  }

  @Delete(':prodId')
  @Roles(Role.Admin)
  deleteProduct(@Param('prodId') prodId: string) {
    const deletedProduct = this.productsService.deleteProduct(prodId);
    return deletedProduct;
  }
}
