import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getRoot(): object {
    return {
      version: '1.0',
      description: 'Welcome to the cocktail API by github.com/pm-k-r',
      _links: {
        cocktails: { href: '/cocktails' },
        categories: { href: '/categories' },
        ingredients: { href: '/ingredients' },
      },
    };
  }
}
