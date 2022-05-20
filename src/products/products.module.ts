import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { ProductTranslationContract } from '../contracts/productTranslationContract';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Series } from '../series/series.entity';
import { SeriesService } from '../series/series.service';
import { TranslationsModule } from './../translations/translations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Series]), TranslationsModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductTranslationContract, SeriesService],
})
export class ProductsModule {}
