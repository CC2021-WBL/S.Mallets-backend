import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { OrderDetails } from './order-details.entity';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails])],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}
