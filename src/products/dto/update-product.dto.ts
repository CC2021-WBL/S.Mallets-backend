import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Name of product model',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  productModel?: string;

  @ApiPropertyOptional({
    description: 'Price by one mallet in EUR currency',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'Head diameter of a mallet',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  headDiameter?: number;

  @ApiPropertyOptional({
    description: 'Mallet stick length',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  stickLength?: number;

  @ApiPropertyOptional({
    description: 'Weight of single mallet',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({
    description: 'Array of base64 - images',
  })
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  productImages: string[];
}
