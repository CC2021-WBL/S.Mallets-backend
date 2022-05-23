import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderDetails } from './order-details.entity';
import { OrderDetailsController } from './order-details.controller';
import { OrderDetailsService } from './order-details.service';
import { Product } from '../products/product.entity';
import { ProductsService } from '../products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails, Product])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService, ProductsService],
})
export class OrderDetailsModule {}
