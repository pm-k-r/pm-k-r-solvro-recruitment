import { Expose } from 'class-transformer';
import { CocktailResponseDto } from './cocktail-response.dto.js';
import { Cocktail } from '../entities/cocktail.entity.js';

export class FindCocktailsResponseDto {
  total: number;
  page: number;
  limit: number;
  pages: number;
  count: number;

  _embedded: { cocktails: CocktailResponseDto[] };

  @Expose()
  get _links() {
    return {
      self: { href: `/cocktails` },
      create: { href: `/cocktails`, method: 'POST' },
    };
  }

  static build(
    entities: Cocktail[],
    total: number,
    page: number,
    limit: number,
  ): FindCocktailsResponseDto {
    const dto = new FindCocktailsResponseDto();
    dto.total = total;
    dto.page = page;
    dto.limit = limit;
    dto.pages = Math.ceil(total / limit);
    dto.count = entities.length;
    dto._embedded = { cocktails: [] };
    entities.forEach((entity) =>
      dto._embedded.cocktails.push(CocktailResponseDto.fromEntity(entity)),
    );
    return dto;
  }
}
