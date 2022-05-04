import * as bcrypt from 'bcrypt';

export const genPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const verifyPassword = async (password: string, hash: string) => {
  const isMatched = await bcrypt.compare(password, hash);
  return isMatched;
};
