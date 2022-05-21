import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

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
  @IsNotEmpty()
  deliveryPriceEuro: number;
}
