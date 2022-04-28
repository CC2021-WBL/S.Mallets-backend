import * as bcrypt from 'bcrypt';

export const genHashAndSalt = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return {
    salt: salt,
    hash: hash,
  };
};

export const verifyPassword = async (password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
