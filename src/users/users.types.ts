import { User } from './user.entity';

export type PreCreateUser = Omit<User, 'id' | 'hash' | 'role'> & {
  password: string;
};
