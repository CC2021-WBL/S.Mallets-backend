import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
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
  surname: string;
  @IsInt()
  @IsPositive()
  phoneNumber: number;
}
