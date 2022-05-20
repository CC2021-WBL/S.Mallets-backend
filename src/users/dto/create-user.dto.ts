import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastname: string;
  @IsNumberString()
  @IsNotEmpty()
  @Length(7, 20)
  phoneNumber: string;
}
