import { Role } from './role.enum';

export interface TokenPayload {
  email: string;
  sub: string;
  roles: Role[];
  iat: number;
}
