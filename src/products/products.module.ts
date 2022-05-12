import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { ProductTransactionService } from '../contracts/ProductTransaction.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TranslationsModule } from './../translations/translations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), TranslationsModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductTransactionService],
})
export class ProductsModule {}
