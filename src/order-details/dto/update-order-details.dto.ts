import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateOrderDetails {
  @ApiPropertyOptional({
    description: `Amount of that kind of mallets to order`,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(50)
  quantity?: number;

  @ApiPropertyOptional({
    description: `Chosen head diameter, range: 30-49mm`,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(30)
  @Max(49)
  headDiameter?: number;

  @ApiPropertyOptional({
    description: `Chosen stick length, range: 35-39cm`,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(35)
  @Max(39)
  stickLength?: number;

  @ApiPropertyOptional({
    description: `Chosen weight, range: 29-37`,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(29)
  @Max(37)
  weight?: number;
}
