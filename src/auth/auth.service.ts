import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { PostgresErrorCode } from './../database/postgresErrorCodes.enum';
import { TokenPayload } from './types/tokenPayload.interface';
import { User } from './../users/user.entity';
import { UsersService } from './../users/users.service';
import {
  changePasswordToHashInUserObj,
  genPassword,
  verifyPassword,
} from './cryptography/passwordUtils';

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
      roles: user.roles,
      iat: Date.now(),
    };
    const jwt = this.jwtService.sign(payload);
    return `jwt=${jwt}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  async register(userData: CreateUserDto): Promise<User> {
    try {
      const hash = await genPassword(userData.password);
      const readyUserData = changePasswordToHashInUserObj(userData, hash);
      const user = await this.usersService.create(readyUserData);
      user.hash = undefined;
      return user;
    } catch (error: any) {
      throw new HttpException('Wrong data', HttpStatus.CONFLICT);
    }
  }

  destroyCookie() {
    return `jwt=invalid; HttpOnly; Path=/; Max-Age=0`;
  }
}
