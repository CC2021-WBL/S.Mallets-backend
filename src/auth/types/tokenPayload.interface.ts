import { Role } from './role.enum';

export interface TokenPayload {
  email: string;
  sub: number;
  roles: Role[];
  iat: number;
}
