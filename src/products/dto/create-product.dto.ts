import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBase64,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { UpdateTranslationDto } from './../../translations/dto/update-translations.dto';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of product model',
  })
  @IsString()
  @IsNotEmpty()
  productModel: string;

  @ApiProperty({
    description: 'Description as object in polish and english',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTranslationDto)
  productDescription!: UpdateTranslationDto;

  @ApiProperty({
    description: 'Price for pair in EUR currency',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Head diameter of a mallet',
  })
  @IsNumber()
  @IsNotEmpty()
  headDiameter: number;

  @ApiProperty({
    description: 'Mallet stick length',
  })
  @IsNumber()
  @IsNotEmpty()
  stickLength: number;

  @ApiProperty({
    description: 'Weight of single mallet',
  })
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @ApiProperty({
    description: 'Array of base64 - images',
  })
  @IsArray()
  @IsNotEmpty()
  productImages: string[];

  @ApiProperty({
    description: 'Alt text for images in polish and englis as object',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTranslationDto)
  productAltText!: UpdateTranslationDto;
}
