import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/types/role.enum';
import { Roles } from 'src/decorators/roles.decorators';

import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ProductsService } from './products.service';
import { RolesGuard } from './../auth/guards/roles.guards';
import { TranslationsService } from './../translations/translations.service';
import { ProductTranslationContract } from '../contracts/productTranslationContract';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly translationService: TranslationsService,
    private readonly productTranslationContract: ProductTranslationContract,
  ) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addProduct(@Body() productData: CreateProductDto) {
    const addedProduct = await this.productTranslationContract.createProduct(
      productData,
    );
    return addedProduct;
  }

  @Get()
  async getAllProducts() {
    return 'products';
  }

  @Get(':prodId')
  async getSingleProduct() {
    return 'single product';
  }
}
