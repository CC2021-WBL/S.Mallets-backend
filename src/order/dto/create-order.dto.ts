import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Delivery } from '../../delivery/delivery.entity';
import { User } from '../../users/user.entity';
import { Address } from '../../addresses/address.entity';

export enum OrderStatusTypes {
  WAITING_FOR_PAYMENT = 'Waiting for payment',
  PROCESSING_TIME = 'Processing time',
  READY_FOR_SHIPMENT = 'Ready for shipment',
  DELIVERY_IN_PROGRESS = 'Delivery in progress',
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  orderStatus: OrderStatusTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  finalCostEuro: number;

  @ApiProperty()
  @IsString()
  messageFromUser: string;

  @ApiProperty({ type: () => Delivery })
  delivery: Delivery;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: () => Address })
  address: Address;
}
