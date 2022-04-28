import { Controller, Post, Request } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register() {
    return this.authService.register();
  }

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
// test file
