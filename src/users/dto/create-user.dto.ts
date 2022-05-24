import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: `Unique in DB, user's email`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `User's password with minimum 6 characters`,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: `User's name`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 15)
  name: string;

  @ApiProperty({
    description: `User's last name`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  lastname: string;

  @ApiProperty({
    description: `User's phone number - just numbers in string`,
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(7, 20)
  phoneNumber: string;
}
