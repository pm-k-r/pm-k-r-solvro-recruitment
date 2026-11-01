import { CategoryResponseDto } from '../../categories/dto/category-response.dto.js';
import { Cocktail } from '../entities/cocktail.entity.js';
import { Expose } from 'class-transformer';
import { CocktailIngredientResponseDto } from '../../cocktail-ingredients/dto/cocktail-ingredient-response.dto.js';

export class CocktailResponseDto {
  id: number;
  name: string;
  categoryId: number;
  instructions: string;
  createdAt: Date;

  _embedded?: {
    cocktailIngredients?: CocktailIngredientResponseDto[];
    category?: CategoryResponseDto;
  };

  @Expose()
  get _links() {
    return {
      self: { href: `/cocktails/${this.id}` },
      patch: { href: `/cocktails/${this.id}`, method: 'PATCH' },
      delete: { href: `/cocktails/${this.id}`, method: 'DELETE' },
      collection: { href: `/cocktails` },
      cocktailIngredients: { href: `/cocktails/${this.id}/ingredients` },
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
    if (entity.cocktailIngredients) {
      dto._embedded ??= {};
      dto._embedded.cocktailIngredients = entity.cocktailIngredients.map((ci) =>
        CocktailIngredientResponseDto.fromEntity(ci),
      );
    }
    if (entity.category) {
      dto._embedded ??= {};
      dto._embedded.category = CategoryResponseDto.fromEntity(entity.category);
    }
    return dto;
  }
}
