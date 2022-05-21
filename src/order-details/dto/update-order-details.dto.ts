import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateOrderDetails {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(50)
  quantity?: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(30)
  @Max(49)
  headDiameter?: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(35)
  @Max(39)
  stickLength?: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(29)
  @Max(37)
  weight?: number;
}
