import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty({
    description: 'Title of delivery',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  deliveryName: string;

  @ApiProperty({
    description: 'Area of delivery',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  deliveryArea: string;

  @ApiProperty({
    description: 'Delivery price in EUR currency',
  })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  deliveryPriceEuro: number;
}
