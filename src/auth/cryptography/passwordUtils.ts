import * as crypto from 'crypto';

export const genPassword = async (password: string) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = genHash(password, salt);
  return {
    salt: salt,
    hash: hash,
  };
};

export const verifyPassword = async (
  password: string,
  hash: string,
  salt: string,
) => {
  const hashToVerify = genHash(password, salt);
  return hash === hashToVerify;
};

const genHash = (password: string, salt: string) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash;
};
