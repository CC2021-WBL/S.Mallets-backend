import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
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
  lastname?: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(7, 20)
  @IsOptional()
  phoneNumber?: number;
}
