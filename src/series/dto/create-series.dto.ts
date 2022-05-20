import {
  IsBase64,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { UpdateTranslationDto } from './../../translations/dto/update-translations.dto';

export class CreateSeriesDto {
  @IsString()
  @IsNotEmpty()
  seriesName: string;

  @IsBase64()
  @IsNotEmpty()
  seriesImage: string;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTranslationDto)
  seriesDescription!: UpdateTranslationDto;

  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTranslationDto)
  seriesAltText!: UpdateTranslationDto;
}
