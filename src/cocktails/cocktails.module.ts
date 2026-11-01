import { Module } from '@nestjs/common';
import { CocktailsService } from './cocktails.service.js';
import { CocktailsController } from './cocktails.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cocktail } from './entities/cocktail.entity.js';
import { CocktailIngredientsInterceptor } from '../cocktail-ingredients/cocktail-ingredients.interceptor.js';

@Module({
  imports: [TypeOrmModule.forFeature([Cocktail])],
  controllers: [CocktailsController],
  providers: [CocktailsService],
})
export class CocktailsModule {}
