import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 60)
  country: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  street: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  numberOfHouse: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  zipCode: string;
}
