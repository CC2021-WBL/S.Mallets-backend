import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/auth/cryptography/passwordUtils';

import { PostgresErrorCode } from './../database/postgresErrorCodes.enum';
import { PreCreateUser } from './../users/users.types';
import { UsersService } from './../users/users.service';
import { genPassword } from './cryptography/passwordUtils';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
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
    try {
      const hashSaltObj = await genPassword(userData.password);
      const user = await this.usersService.create({
        ...userData,
        hash: hashSaltObj.hash,
        salt: hashSaltObj.salt,
      });
      user.hash = undefined;
      user.salt = undefined;
      return user;
    } catch (error: any) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
