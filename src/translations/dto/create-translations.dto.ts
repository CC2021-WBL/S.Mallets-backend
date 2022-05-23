import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTranslationDto {
  @ApiProperty({
    description: `Key of translation - automaticly generated from product / series name`,
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    description: `Polish version of needed text`,
  })
  @IsString()
  @IsNotEmpty()
  pl: string;

  @ApiProperty({
    description: `English version of needed text`,
  })
  @IsString()
  @IsNotEmpty()
  en: string;
}
