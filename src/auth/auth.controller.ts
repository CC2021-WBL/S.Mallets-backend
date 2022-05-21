import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import RequestWithUser from './types/requestWithUser.interface';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    const user = await this.authService.register(userData);
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const cookie = await this.authService.getCookieWithJwt(req.user);
    // res.setHeader('Set-Cookie', cookie);
    res.cookie('smalletsToken', cookie);
    req.user.hash = undefined;
    return res.send(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    const invalidCookie = this.authService.destroyCookie();
    res.setHeader('Set-Cookie', invalidCookie);
    return res.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() req: RequestWithUser) {
    const user = req.user;
    user.hash = undefined;
    return user;
  }
}
