import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

import { CreateOrderDetailsDto } from '../../order-details/dto/create-order-details.dto';

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
    description: 'Delivery ID',
  })
  @IsString()
  @IsNotEmpty()
  deliveryId: number;

  @ApiProperty({
    description: `Client's name`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    description: `Client's last name`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastname: string;

  @ApiProperty({
    description: `Client's email`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `Client's phone number`,
  })
  @IsNumberString()
  @Length(7, 20)
  phoneNumber: string;

  @ApiProperty({
    description: `Delivery address - country`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 60)
  country: string;

  @ApiProperty({
    description: `Delivery address - city`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  city: string;

  @ApiProperty({
    description: `Delivery address - name of a street and number of house`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  streetAndNumber: string;

  @ApiProperty({
    description: `Delivery address - zip code`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  zipCode: string;

  @ApiProperty({
    description: `Array of ordered products`,
  })
  @IsArray()
  orderedProducts: CreateOrderDetailsDto[];
}
