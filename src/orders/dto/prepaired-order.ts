import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

import { Delivery } from '../../delivery/delivery.entity';
import { OrderDetails } from '../../order-details/order-details.entity';
import { User } from '../../users/user.entity';

export class PrepairedOrderType {
  @IsString()
  messageFromUser?: string;

  @IsArray()
  orderDetails?: OrderDetails[];

  user?: User;

  delivery: Delivery;

  @IsNumber()
  @IsNotEmpty()
  finalCostEuro: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastname: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  @Length(7, 20)
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 60)
  country: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 70)
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 60)
  streetAndNumber: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  zipCode: string;
}
