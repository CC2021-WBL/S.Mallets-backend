import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async welcome() {
    return 'Welcome to S.Mallets online shop';
  }
}
