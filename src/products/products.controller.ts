import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/auth/types/role.enum';
import { Roles } from 'src/decorators/roles.decorators';

import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ProductsService } from './products.service';
import { RolesGuard } from './../auth/guards/roles.guards';
import { ApiTags } from '@nestjs/swagger';
import { TranslationsService } from './../translations/translations.service';
import { ProductTranslationContract } from '../contracts/productTranslationContract';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly translationService: TranslationsService,
    private readonly productTranslationContract: ProductTranslationContract,
  ) {}

  @Post(':seriesId')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addProduct(
    @Param('seriesId', ParseIntPipe) seriesId: number,
    @Body() productData: CreateProductDto,
  ) {
    const addedProduct = await this.productTranslationContract.createProduct(
      productData,
      seriesId,
    );
    return addedProduct;
  }

  @Get()
  async getAllProducts() {
    const allproducts = await this.productsService.getAllProducts();
    return allproducts;
  }

  @Get(':prodId')
  async getSingleProduct(@Param('prodId', ParseIntPipe) prodId: number) {
    const product = await this.productsService.getSingleProduct(prodId);
    return product;
  }
}
