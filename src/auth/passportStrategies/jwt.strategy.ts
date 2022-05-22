import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { TokenPayload } from '../types/tokenPayload.interface';
import { UsersService } from './../../users/users.service';

//import { Request } from 'express';

// TODO: jwt from cookie
// const jwtFromCookie = {
//   jwtFromRequest: ExtractJwt.fromExtractors([
//     (req: Request) => {
//       return req?.cookies?.jwt;
//     },
//   ]),
//   ignoreExpiration: false,
//   secretOrKey: configService.get('JWT_SECRET'),
// };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('auth'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.usersService.getUserWithAddress(payload.sub);
    return user;
  }
}
