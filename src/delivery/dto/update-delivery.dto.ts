import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateDeliveryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(2, 50)
  deliveryName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  @IsOptional()
  deliveryArea?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  deliveryPriceEuro?: number;
}
