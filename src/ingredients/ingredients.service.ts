import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto.js';
import { UpdateIngredientDto } from './dto/update-ingredient.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, QueryFailedError, Repository } from 'typeorm';
import {
  ResourceAlreadyExistsError,
  ResourceNotFoundError,
} from '../common/domain.errors.js';
import { Ingredient } from './entities/ingredient.entity.js';
import { IngredientResponseDto } from './dto/ingredient-response.dto.js';
import { FindIngredientsResponseDto } from './dto/find-ingredients-response.dto.js';
import { FindIngredientsQueryDto } from './dto/find-ingredients-query.dto.js';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>,
  ) {}

  private async saveIngredient(category: Ingredient): Promise<Ingredient> {
    let entity: Ingredient;
    try {
      entity = await this.ingredientRepo.save(category);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code == '23505'
      ) {
        throw new ResourceAlreadyExistsError(error.driverError?.detail);
      } else {
        throw error;
      }
    }
    return entity;
  }

  async create(dto: CreateIngredientDto): Promise<IngredientResponseDto> {
    const ingredient = new Ingredient();
    ingredient.name = dto.name;
    ingredient.description = dto.description;
    ingredient.isAlcohol = dto.isAlcohol;
    ingredient.photo = dto.photo;
    const entity = await this.saveIngredient(ingredient);
    return IngredientResponseDto.fromEntity(entity);
  }

  async findAll(
    dto: FindIngredientsQueryDto,
  ): Promise<FindIngredientsResponseDto> {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 5;
    const isAlcohol = dto.isAlcohol ?? 'maybe';
    const options: FindManyOptions<Ingredient> = {
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'asc' },
    };
    if (isAlcohol != 'maybe') options.where = { isAlcohol: isAlcohol == 'yes' };
    const [ingredients, total] =
      await this.ingredientRepo.findAndCount(options);
    return FindIngredientsResponseDto.build(ingredients, total, page, limit);
  }

  async findOne(id: number): Promise<IngredientResponseDto> {
    const entity = await this.ingredientRepo.findOneBy({ id: id });
    if (!entity) throw new ResourceNotFoundError(id);
    return IngredientResponseDto.fromEntity(entity);
  }

  async update(
    id: number,
    dto: UpdateIngredientDto,
  ): Promise<IngredientResponseDto> {
    const ingredient = await this.ingredientRepo.findOneBy({ id: id });
    if (!ingredient) throw new ResourceNotFoundError(id);
    ingredient.name = dto.name ?? ingredient.name;
    ingredient.description = dto.description ?? ingredient.description;
    ingredient.isAlcohol = dto.isAlcohol ?? ingredient.isAlcohol;
    ingredient.photo = dto.photo ?? ingredient.photo;
    const entity = await this.saveIngredient(ingredient);
    return IngredientResponseDto.fromEntity(entity);
  }

  async remove(id: number): Promise<void> {
    const ingredient = await this.ingredientRepo.findOneBy({ id: id });
    if (!ingredient) throw new ResourceNotFoundError(id);
    await this.ingredientRepo.remove(ingredient);
  }
}
