import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTranslationDto {
  @ApiPropertyOptional({
    description: `Polish version of needed text`,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  pl: string;

  @ApiPropertyOptional({
    description: `English version of needed text`,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  en: string;
}
