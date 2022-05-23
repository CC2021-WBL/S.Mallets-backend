import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: `User's name`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: `User's last name`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @IsOptional()
  lastname?: string;

  @ApiPropertyOptional({
    description: `User's phone number - just numbers in string`,
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(7, 20)
  @IsOptional()
  phoneNumber?: number;
}
