import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  @IsPositive()
  @IsNotEmpty()
  @IsOptional()
  deliveryPriceEuro?: number;
}
