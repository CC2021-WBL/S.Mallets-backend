import {
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
  @IsString()
  @IsNotEmpty()
  productModel: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTranslationDto)
  productDescription!: UpdateTranslationDto;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  headDiameter: number;

  @IsNumber()
  @IsNotEmpty()
  stickLength: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsBase64()
  @IsNotEmpty()
  productImage: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTranslationDto)
  productAltText!: UpdateTranslationDto;
}
