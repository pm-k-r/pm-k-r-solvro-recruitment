import { CategoryResponseDto } from '../../categories/dto/category-response.dto.js';
import { Cocktail } from '../entities/cocktail.entity.js';
import { Expose } from 'class-transformer';
import { IngredientResponseDto } from '../../ingredients/dto/ingredient-response.dto.js';
import { Unit } from '../entities/cocktail-ingredient.entity.js';

class CocktailIngredientDto {
  ingredientId: number;
  amount: number;
  unit: Unit;
  _embedded?: { ingredient: IngredientResponseDto };
}

export class CocktailResponseDto {
  id: number;
  name: string;
  categoryId: number;
  instructions: string;
  createdAt: Date;
  ingredients: CocktailIngredientDto[];

  _embedded?: { category: CategoryResponseDto };

  @Expose()
  get _links() {
    return {
      self: { href: `/cocktails/${this.id}` },
      patch: { href: `/cocktails/${this.id}`, method: 'PATCH' },
      delete: { href: `/cocktails/${this.id}`, method: 'DELETE' },
      collection: { href: `/cocktails` },
      category: { href: `/categories/${this.categoryId}` },
    };
  }

  static fromEntity(entity: Cocktail): CocktailResponseDto {
    const dto = new CocktailResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.categoryId = entity.categoryId;
    dto.instructions = entity.instructions;
    dto.createdAt = entity.createdAt;
    if (entity.category) {
      dto._embedded = {
        category: CategoryResponseDto.fromEntity(entity.category),
      };
    }
    if (entity.cocktailIngredients) {
      dto.ingredients = [];
      entity.cocktailIngredients.forEach((ci) => {
        const ciDto = new CocktailIngredientDto();
        ciDto.ingredientId = ci.ingredientId;
        ciDto.amount = ci.amount;
        ciDto.unit = ci.unit;
        if (ci.ingredient)
          ciDto._embedded = {
            ingredient: IngredientResponseDto.fromEntity(ci.ingredient),
          };
        dto.ingredients.push(ciDto);
      });
    }
    return dto;
  }
}
