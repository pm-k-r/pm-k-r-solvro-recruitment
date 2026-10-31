import { Module } from '@nestjs/common';
import { CocktailsService } from './cocktails.service.js';
import { CocktailsController } from './cocktails.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cocktail } from './entities/cocktail.entity.js';
import { CocktailIngredient } from './entities/cocktail-ingredient.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Cocktail, CocktailIngredient])],
  controllers: [CocktailsController],
  providers: [CocktailsService],
})
export class CocktailsModule {}
