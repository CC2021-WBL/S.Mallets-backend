import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

import { OrderDetailsService } from './order-details.service';

@ApiTags('order_details')
@Controller('orderDetails')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}
}
