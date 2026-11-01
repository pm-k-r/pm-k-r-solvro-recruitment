import { Module } from '@nestjs/common';
import { CocktailIngredientsService } from './cocktail-ingredients.service.js';
import { CocktailIngredientsController } from './cocktail-ingredients.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CocktailIngredient } from './entities/cocktail-ingredient.entity.js';
import { Cocktail } from '../cocktails/entities/cocktail.entity.js';
import { CocktailIngredientsInterceptor } from './cocktail-ingredients.interceptor.js';

@Module({
  imports: [TypeOrmModule.forFeature([CocktailIngredient, Cocktail])],
  controllers: [CocktailIngredientsController],
  providers: [CocktailIngredientsService, CocktailIngredientsInterceptor],
})
export class CocktailIngredientsModule {}
