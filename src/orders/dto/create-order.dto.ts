import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsInt,
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
    description: 'Id of logged user',
    default: 'f2cc34f4-b02e-4e36-ab1b-5fdbddd451ca',
  })
  userId?: string;

  @ApiProperty({
    description: 'Delivery ID',
    default: 1,
  })
  @IsInt()
  @IsNotEmpty()
  deliveryId: number;

  @ApiProperty({
    description: `Client's name`,
    default: 'Matylda',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    description: `Client's last name`,
    default: 'Borutka',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastname: string;

  @ApiProperty({
    description: `Client's email`,
    default: 'matylda@op.pl',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `Client's phone number`,
    default: '0048601729567',
  })
  @IsNumberString()
  @Length(7, 20)
  phoneNumber: string;

  @ApiProperty({
    description: `Delivery address - country`,
    default: 'Polska',
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 60)
  country: string;

  @ApiProperty({
    description: `Delivery address - city`,
    default: 'Bojano',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  city: string;

  @ApiProperty({
    description: `Delivery address - name of a street and number of house`,
    default: 'Rolnicza 11',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 60)
  streetAndNumber: string;

  @ApiProperty({
    description: `Delivery address - zip code`,
    default: '80-222',
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  zipCode: string;

  @ApiProperty({
    description: `Array of ordered products`,
    default: [
      {
        productId: 1,
        quantity: 2,
        headDiameter: 36,
        stickLength: 39,
        weight: 30,
      },
    ],
  })
  @IsArray()
  orderedProducts: CreateOrderDetailsDto[];
}
