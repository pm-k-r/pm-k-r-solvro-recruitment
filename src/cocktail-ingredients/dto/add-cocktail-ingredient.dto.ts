import { Unit } from '../entities/cocktail-ingredient.entity.js';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { G_CONST } from '../../common/global-constants.js';

export class AddCocktailIngredientDto {
  @IsInt()
  @Min(1)
  @Max(G_CONST.DB_INT_MAX)
  ingredientId: number;

  @IsInt()
  @IsPositive()
  amount: number;

  @IsEnum(Unit)
  unit: Unit;
}
