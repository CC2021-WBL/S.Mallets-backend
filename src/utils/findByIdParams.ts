import { IsNumberString } from 'class-validator';

export class FindByIdParams {
  @IsNumberString()
  id: string;
}

export class FindByUserIdParams {
  @IsNumberString()
  userId: string;
}

export class FindByAddressIdParams {
  @IsNumberString()
  addressId: string;
}
