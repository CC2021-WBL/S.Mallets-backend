import { IsBase64, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSeriesDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  seriesName: string;

  @IsBase64()
  @IsNotEmpty()
  @IsOptional()
  seriesImage: string;
}
