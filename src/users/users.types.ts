import { User } from './user.entity';

export type PreCreateUser = Omit<User, 'id' | 'hash' | 'salt' | 'role'> & {
  password: string;
};
