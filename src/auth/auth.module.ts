import 'dotenv/config';

import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passportStrategies/jwt.strategy';
import { LocalStrategy } from './passportStrategies/local.strategy';
import { PUB_KEY } from './cryptography/id_rsa_pub';
import { UsersModule } from './../users/users.module';

//import * as fs from 'fs';
///import * as path from 'path';

//const pathToKey = path.join(__dirname, '.', 'cryptography', 'id_rsa_pub.pem');

//const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      publicKey: PUB_KEY,
      privateKey: process.env.PRIV_KEY,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
