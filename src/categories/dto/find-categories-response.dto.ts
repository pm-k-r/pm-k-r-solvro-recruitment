import { Category } from '../entities/category.entity.js';
import { Expose } from 'class-transformer';
import { CategoryResponseDto } from './category-response.dto.js';

export class FindCategoriesResponseDto {
  total: number;

  _embedded: { categories: CategoryResponseDto[] };

  @Expose()
  get _links() {
    return {
      self: { href: `/categories` },
      create: { href: `/categories`, method: 'POST' },
    };
  }

  static fromEntities(entities: Category[]): FindCategoriesResponseDto {
    const dto = new FindCategoriesResponseDto();
    dto.total = entities.length;
    dto._embedded = { categories: [] };
    entities.forEach((entity) =>
      dto._embedded.categories.push(CategoryResponseDto.fromEntity(entity)),
    );
    return dto;
  }
}
