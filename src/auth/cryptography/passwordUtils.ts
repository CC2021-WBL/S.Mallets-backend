import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './../../users/dto/create-user.dto';
import { HashUser } from './../../users/types/hash-user-type';
import { User } from '../../users/user.entity';

export const genPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const verifyPassword = async (password: string, hash: string) => {
  const isMatched = await bcrypt.compare(password, hash);
  return isMatched;
};

export const changePasswordToHashInUserObj = (
  userData: CreateUserDto,
  hash: string,
): HashUser => {
  delete userData.password;
  return { ...userData, hash: hash };
};
