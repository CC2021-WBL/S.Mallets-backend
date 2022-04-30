import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { PUB_KEY } from './../cryptography/id_rsa_pub';

//import * as fs from 'fs';
//import * as path from 'path';

//const pathToKey = path.join(__dirname, '..', 'cryptography', 'id_rsa_pub.pem');
//const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: PUB_KEY,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
