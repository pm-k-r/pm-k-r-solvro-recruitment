import { Category } from '../entities/category.entity.js';
import { Expose } from 'class-transformer';

export class CategoryResponseDto {
  id: number;
  name: string;

  @Expose()
  get _links() {
    return {
      self: { href: `/categories/${this.id}` },
      patch: { href: `/categories/${this.id}`, method: 'PATCH' },
      delete: { href: `/categories/${this.id}`, method: 'DELETE' },
      collection: { href: `/categories` },
      cocktails: { href: `/cocktails?categoryId=${this.id}` },
    };
  }

  static fromEntity(entity: Category): CategoryResponseDto {
    const dto = new CategoryResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    return dto;
  }
}
