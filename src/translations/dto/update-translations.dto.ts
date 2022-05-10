import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTranslationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  pl: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  en: string;
}
