import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: `Unique name of a series`,
  })
  @IsString()
  @IsNotEmpty()
  seriesName: string;

  @ApiProperty({
    description: `Image for a series in base64`,
  })
  @IsBase64()
  @IsNotEmpty()
  seriesImage: string;

  @ApiProperty({
    description: `Object, which include 'pl' and 'en' props with proper texts for series description`,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTranslationDto)
  seriesDescription!: UpdateTranslationDto;

  @ApiProperty({
    description: `Object, which include 'pl' and 'en' props with proper alt text for image`,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateTranslationDto)
  seriesAltText!: UpdateTranslationDto;
}
