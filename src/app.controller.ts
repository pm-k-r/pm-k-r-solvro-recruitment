import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getRoot(): object {
    return {
      version: '0.0.1',
      description: 'Welcome to the cocktail API by github.com/pm-k-r',
    };
  }
}
