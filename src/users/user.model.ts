import { Role } from './../auth/role.enum';

export class User {
  userId: string;
  email: string;
  name: string;
  surname: string;
  roles: Role[];
  hash: string;
  salt: string;
}
