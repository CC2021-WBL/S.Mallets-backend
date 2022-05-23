import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Message from user',
    default: 'Please gift this as a gift',
  })
  @IsString()
  @Length(1, 1500)
  messageFromUser?: string;

  @ApiPropertyOptional({
    description: `Client's name`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @ApiPropertyOptional({
    description: `Client's last name`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastname: string;

  @ApiPropertyOptional({
    description: `Client's phone number`,
  })
  @IsNumberString()
  @Length(7, 20)
  phoneNumber: string;

  @ApiPropertyOptional({
    description: `Delivery address - country`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 60)
  country: string;

  @ApiPropertyOptional({
    description: `Delivery address - city`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  city: string;

  @ApiPropertyOptional({
    description: `Delivery address - name of a street and number of house`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  streetAndNumber: string;

  @ApiPropertyOptional({
    description: `Delivery address - zip code`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  zipCode: string;
}
