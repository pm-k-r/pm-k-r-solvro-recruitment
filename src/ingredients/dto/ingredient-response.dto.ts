import { Expose } from 'class-transformer';
import { Ingredient } from '../entities/ingredient.entity.js';

export class IngredientResponseDto {
  id: number;
  name: string;
  description: string;
  isAlcohol: boolean;
  photo: string;

  @Expose()
  get _links() {
    return {
      self: { href: `/ingredients/${this.id}` },
      patch: { href: `/ingredients/${this.id}`, method: 'PATCH' },
      delete: { href: `/ingredients/${this.id}`, method: 'DELETE' },
      collection: { href: `/ingredients` },
      cocktails: { href: `/cocktails?ingredientIds=${this.id}` },
    };
  }

  static fromEntity(entity: Ingredient): IngredientResponseDto {
    const dto = new IngredientResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.isAlcohol = entity.isAlcohol;
    dto.photo = entity.photo;
    return dto;
  }
}
