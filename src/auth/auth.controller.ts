import { PreCreateUser } from './../users/users.types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import RequestWithUser from './types/requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: PreCreateUser) {
    const user = await this.authService.register(userData);
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithUser) {
    return this.authService.createJwt(req.user);
  }
}
