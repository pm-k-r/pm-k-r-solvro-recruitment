import { Expose } from 'class-transformer';
import { IngredientResponseDto } from './ingredient-response.dto.js';
import { Ingredient } from '../entities/ingredient.entity.js';

export class FindIngredientsResponseDto {
  total: number;
  page: number;
  limit: number;
  pages: number;
  count: number;

  _embedded: { ingredients: IngredientResponseDto[] };

  @Expose()
  get _links() {
    return {
      self: { href: `/categories` },
      create: { href: `/categories`, method: 'POST' },
    };
  }

  static build(
    entities: Ingredient[],
    total: number,
    page: number,
    limit: number,
  ): FindIngredientsResponseDto {
    const dto = new FindIngredientsResponseDto();
    dto.total = total;
    dto.page = page;
    dto.limit = limit;
    dto.pages = Math.ceil(total / limit);
    dto.count = entities.length;
    dto._embedded = { ingredients: [] };
    entities.forEach((entity) =>
      dto._embedded.ingredients.push(IngredientResponseDto.fromEntity(entity)),
    );
    return dto;
  }
}
