import { Role } from './role.enum';

export interface TokenPayload {
  email: string;
  sub: number;
  role: Role;
  iat: number;
}
