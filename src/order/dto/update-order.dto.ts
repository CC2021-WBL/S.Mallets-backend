import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Delivery } from '../../delivery/delivery.entity';
import { User } from '../../users/user.entity';
import { Address } from '../../addresses/address.entity';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Message from user',
    default: 'Please gift this as a gift',
  })
  @IsString()
  @Length(1, 1500)
  messageFromUser?: string;

  @ApiProperty({
    description: 'Reference to delivery',
    default: '0a78645f-f742-4da1-b98f-45a13ecc6de8',
    type: () => Delivery,
  })
  delivery?: Delivery;

  @ApiProperty({
    description: 'Reference to user',
    default: 'eff74690-f5bd-4c67-8171-6e22d5393c0e',
    type: () => User,
  })
  user?: User;

  @ApiProperty({
    description: 'Reference to address',
    default: 'ab68ba60-e0d1-4eb9-9f5a-612d2fa06c0e',
    type: () => Address,
  })
  address?: Address;
}
