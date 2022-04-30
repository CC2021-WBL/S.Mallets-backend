import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/auth/cryptography/passwordUtils';

import { PreCreateUser } from './../users/users.types';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByCurrentField('email', email);
    console.log(user);
    const isValid =
      user && (await verifyPassword(password, user.hash, user.salt));
    if (isValid) {
      return user;
    }
    return null;
  }

  async createJwt(user: any) {
    const payload = {
      email: user.email,
      sub: user.userId,
      role: user.role,
      iat: Date.now(),
    };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }

  async register(userData: PreCreateUser): Promise<any> {
    const user = await this.usersService.create(userData);
    return user;
  }
}
