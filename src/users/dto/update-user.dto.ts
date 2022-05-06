import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @IsOptional()
  surname?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  phoneNumber?: number;
}
