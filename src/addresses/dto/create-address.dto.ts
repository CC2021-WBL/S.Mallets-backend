import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: `User's address - country name, length 4-60 chars`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 60)
  country: string;

  @ApiProperty({
    description: `User's address - city name, length 1-70 chars`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  city: string;

  @ApiProperty({
    description: `User's address - street name, length 1-70 chars`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  street: string;

  @ApiProperty({
    description: `User's address - number of house as sting, length 1-10 chars`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  numberOfHouse: string;

  @ApiProperty({
    description: `User's address - zip code as string, length 4-15 chars`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  zipCode: string;
}
