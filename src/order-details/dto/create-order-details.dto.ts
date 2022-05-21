import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Max,
  Min,
} from 'class-validator';

import { Ranges } from '../../utils/ranges';

export class CreateOrderDetailsDto {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(50)
  quantity: Ranges<1, 50>;

  @IsNumber()
  @IsNotEmpty()
  @Min(30)
  @Max(49)
  headDiameter: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(35)
  @Max(39)
  stickLength: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(29)
  @Max(37)
  weight: number;
}
