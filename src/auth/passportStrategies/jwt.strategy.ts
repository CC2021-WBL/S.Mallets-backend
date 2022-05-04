import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { PUB_KEY } from './../cryptography/id_rsa_pub';
import { TokenPayload } from '../types/tokenPayload.interface';
import { UsersService } from './../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req && req.cookies) {
            const jwt = req.cookies.jwt;
            console.log(jwt);
            return jwt;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: PUB_KEY,
    });
  }

  async validate(payload: TokenPayload) {
    console.log(payload);
    return this.usersService.findOneById(payload.sub);
  }
}
