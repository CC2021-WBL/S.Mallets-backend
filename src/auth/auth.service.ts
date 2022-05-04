import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from 'src/auth/cryptography/passwordUtils';

import { PostgresErrorCode } from './../database/postgresErrorCodes.enum';
import { PreCreateUser } from './../users/users.types';
import { TokenPayload } from './types/tokenPayload.interface';
import { User } from './../users/user.entity';
import { UsersService } from './../users/users.service';
import { genPassword } from './cryptography/passwordUtils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isValid = user && (await verifyPassword(password, user.hash));
    if (isValid) {
      return user;
    }
    return null;
  }

  async getCookieWithJwt(user: User) {
    const payload: TokenPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      iat: Date.now(),
    };
    const jwt = this.jwtService.sign(payload);
    return `jwt=${jwt}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  async register(userData: PreCreateUser): Promise<any> {
    try {
      const hash = await genPassword(userData.password);
      const user = await this.usersService.create({
        ...userData,
        hash: hash,
      });
      user.hash = undefined;
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
