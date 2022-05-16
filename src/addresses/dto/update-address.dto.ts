import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @Length(4, 60)
  @IsOptional()
  country?: string;

  @IsString()
  @Length(1, 70)
  @IsOptional()
  city?: string;

  @IsString()
  @Length(1, 70)
  @IsOptional()
  street?: string;

  @IsString()
  @Length(1, 10)
  @IsOptional()
  numberOfHouse?: string;

  @IsString()
  @Length(4, 15)
  @IsOptional()
  zipCode?: string;
}
