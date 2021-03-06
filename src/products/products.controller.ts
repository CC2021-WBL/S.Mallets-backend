import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import { UpdateProductDto } from './dto/update-product.dto';

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
    const isProductAdded = await this.productTranslationContract.createProduct(
      productData,
      seriesId,
    );
    return isProductAdded;
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

  @Patch(':prodId')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateProduct(
    @Param('prodId', ParseIntPipe) prodId: number,
    @Body() data: UpdateProductDto,
  ) {
    const updatedProduct = await this.productsService.updateProduct(
      prodId,
      data,
    );
    return updatedProduct;
  }
}
