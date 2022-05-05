import { User } from './user.entity';

export type PreCreateUser = Pick<
  User,
  'email' | 'name' | 'surname' | 'phoneNumber'
> & {
  password: string;
};

export class CreateUserDto {
  email: string;
  name: string;
  surname: string;
  phoneNumber: string;
}
