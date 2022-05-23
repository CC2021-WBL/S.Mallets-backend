import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateDeliveryDto {
  @ApiPropertyOptional({
    description: `Name of delivery option`,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Length(2, 50)
  deliveryName?: string;

  @ApiPropertyOptional({
    description: `Area where that option of delivery is possible`,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  @IsOptional()
  deliveryArea?: string;

  @ApiPropertyOptional({
    description: 'Price for the delivery ine EUR currency',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  deliveryPriceEuro?: number;
}
