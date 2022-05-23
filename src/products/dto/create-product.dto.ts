import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
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
    description: `Object with 'pl' and 'en' properties, which contains description of a product in that language`,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTranslationDto)
  productDescription!: UpdateTranslationDto;

  @ApiProperty({
    description: 'Price by one mallet in EUR currency',
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
    description:
      'Alt text for images in polish and english as object - UpdateTranslationDto',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTranslationDto)
  productAltText!: UpdateTranslationDto;
}
