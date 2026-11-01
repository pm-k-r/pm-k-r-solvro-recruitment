import { PartialType } from '@nestjs/swagger';
import { AddCocktailIngredientDto } from './add-cocktail-ingredient.dto.js';

export class UpdateCocktailIngredientDto extends PartialType(
  AddCocktailIngredientDto,
) {}
