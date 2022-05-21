import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

import { Delivery } from '../../delivery/delivery.entity';

export enum OrderStatusTypes {
  WAITING_FOR_PAYMENT = 'Waiting for payment',
  PROCESSING_TIME = 'Processing time',
  READY_FOR_SHIPMENT = 'Ready for shipment',
  DELIVERY_IN_PROGRESS = 'Delivery in progress',
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Message from user',
    default: 'Please gift this as a gift',
  })
  messageFromUser?: string;

  @ApiProperty({
    description: 'Reference to delivery',
    default: '0a78645f-f742-4da1-b98f-45a13ecc6de8',
    type: () => Delivery,
  })
  @IsString()
  @IsNotEmpty()
  delivery!: Delivery;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastname: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  @Length(7, 20)
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 60)
  country: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  numberOfHouse: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  zipCode: string;
}
