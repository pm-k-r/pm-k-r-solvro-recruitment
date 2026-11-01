import { Exclude, Expose } from 'class-transformer';
import { CocktailIngredientResponseDto } from './cocktail-ingredient-response.dto.js';
import { CocktailIngredient } from '../entities/cocktail-ingredient.entity.js';

export class FindCocktailIngredientsDto {
  total: number;

  _embedded: { cocktailIngredients: CocktailIngredientResponseDto[] };

  @Exclude()
  private cocktailId: number;

  @Expose()
  get _links() {
    return {
      self: { href: `/cocktails/${this.cocktailId}/ingredients` },
      add: {
        href: `/cocktails/${this.cocktailId}/ingredients`,
        method: 'POST',
      },
      cocktail: { href: `/cocktails/${this.cocktailId}` },
    };
  }

  static build(
    entities: CocktailIngredient[],
    cocktailId: number,
  ): FindCocktailIngredientsDto {
    const dto = new FindCocktailIngredientsDto();
    dto.total = entities.length;
    dto.cocktailId = cocktailId;
    dto._embedded = { cocktailIngredients: [] };
    entities.forEach((entity) =>
      dto._embedded.cocktailIngredients.push(
        CocktailIngredientResponseDto.fromEntity(entity),
      ),
    );
    return dto;
  }
}
