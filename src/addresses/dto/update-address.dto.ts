import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAddressDto {
  @ApiPropertyOptional({
    description: `User's address - country name, length 4-60 chars`,
  })
  @IsString()
  @Length(4, 60)
  @IsOptional()
  country?: string;

  @ApiPropertyOptional({
    description: `User's address - city name, length 1-70 chars`,
  })
  @IsString()
  @Length(1, 70)
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    description: `User's address - street name, length 1-70 chars`,
  })
  @IsString()
  @Length(1, 70)
  @IsOptional()
  street?: string;

  @ApiPropertyOptional({
    description: `User's address - number of house as sting, length 1-10 chars`,
  })
  @IsString()
  @Length(1, 10)
  @IsOptional()
  numberOfHouse?: string;

  @ApiPropertyOptional({
    description: `User's address - zip code as string, length 4-15 chars`,
  })
  @IsString()
  @Length(4, 15)
  @IsOptional()
  zipCode?: string;
}
