import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSeriesDto {
  @ApiPropertyOptional({
    description: `New, unique name for a series, must include "-" between words`,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  seriesName?: string;

  @ApiPropertyOptional({
    description: `Image for a series in base64`,
  })
  @IsBase64()
  @IsNotEmpty()
  @IsOptional()
  seriesImage?: string;
}
