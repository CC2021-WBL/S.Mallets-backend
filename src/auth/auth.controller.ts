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
import { CookieOptions, Response } from 'express';

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
    // res.cookie('smalletsToken', cookie.jwt);
    // req.user.token = cookie;
    req.user.hash = undefined;
    const data = { ...req.user, token: cookie };
    return res.send(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: RequestWithUser, @Res() res: Response) {
    const invalidCookie = this.authService.destroyCookie();
    res.setHeader('Set-Cookie', invalidCookie);
    // TODO: for now on frontend
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
