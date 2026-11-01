import {
  CocktailIngredient,
  Unit,
} from '../entities/cocktail-ingredient.entity.js';
import { IngredientResponseDto } from '../../ingredients/dto/ingredient-response.dto.js';
import { CocktailResponseDto } from '../../cocktails/dto/cocktail-response.dto.js';
import { Expose } from 'class-transformer';

export class CocktailIngredientResponseDto {
  cocktailId: number;
  ingredientId: number;
  amount: number;
  unit: Unit;

  _embedded?: {
    ingredient?: IngredientResponseDto;
    cocktail?: CocktailResponseDto;
  };

  @Expose()
  get _links() {
    return {
      self: {
        href: `/cocktails/${this.cocktailId}/ingredients/${this.ingredientId}`,
      },
      patch: {
        href: `/cocktails/${this.cocktailId}/ingredients/${this.ingredientId}`,
        method: 'PATCH',
      },
      remove: {
        href: `/cocktails/${this.cocktailId}/ingredients/${this.ingredientId}`,
        method: 'DELETE',
      },
      collection: { href: `/cocktails/${this.cocktailId}/ingredients` },
      cocktail: { href: `/cocktails/${this.cocktailId}` },
      ingredient: { href: `/ingredients/${this.ingredientId}` },
    };
  }

  static fromEntity(entity: CocktailIngredient): CocktailIngredientResponseDto {
    const dto = new CocktailIngredientResponseDto();
    dto.cocktailId = entity.cocktailId;
    dto.ingredientId = entity.ingredientId;
    dto.amount = entity.amount;
    dto.unit = entity.unit;
    if (entity.ingredient) {
      dto._embedded ??= {};
      dto._embedded.ingredient = IngredientResponseDto.fromEntity(
        entity.ingredient,
      );
    }
    if (entity.cocktail) {
      dto._embedded ??= {};
      dto._embedded.cocktail = CocktailResponseDto.fromEntity(entity.cocktail);
    }
    return dto;
  }
}
