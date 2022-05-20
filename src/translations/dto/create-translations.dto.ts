import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTranslationDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  pl: string;

  @IsString()
  @IsNotEmpty()
  en: string;
}
