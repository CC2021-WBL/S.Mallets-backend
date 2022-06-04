import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

// import { Ranges } from '../../utils/ranges';

export class CreateOrderDetailsDto {
  @ApiProperty({
    description: `ID of ordered product`,
    default: 6,
  })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  productId: number;

  @ApiProperty({
    description: `Amount of that kind of mallets to order`,
    default: 2,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(50)
  quantity: number;
  // quantity: Ranges<1, 50>;

  @ApiProperty({
    description: `Chosen head diameter, range: 30-49mm`,
    default: 35,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(30)
  @Max(49)
  headDiameter: number;

  @ApiProperty({
    description: `Chosen stick length, range: 35-39cm`,
    default: 36,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(35)
  @Max(39)
  stickLength: number;

  @ApiProperty({
    description: `Chosen weight, range: 29-37`,
    default: 33,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(29)
  @Max(37)
  weight: number;
}
