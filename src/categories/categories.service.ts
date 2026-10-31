import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity.js';
import { QueryFailedError, Repository } from 'typeorm';
import { CategoryResponseDto } from './dto/category-response.dto.js';
import {
  ResourceAlreadyExistsError,
  ResourceNotFoundError,
} from '../common/domain.errors.js';
import { FindCategoriesResponseDto } from './dto/find-categories-response.dto.js';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  private async saveCategory(category: Category): Promise<Category> {
    let entity: Category;
    try {
      entity = await this.categoryRepo.save(category);
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

  async create(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const category = new Category();
    category.name = dto.name;
    const entity = await this.saveCategory(category);
    return CategoryResponseDto.fromEntity(entity);
  }

  async findAll(): Promise<FindCategoriesResponseDto> {
    const categories = await this.categoryRepo.find();
    return FindCategoriesResponseDto.fromEntities(categories);
  }

  async findOne(id: number): Promise<CategoryResponseDto> {
    const entity = await this.categoryRepo.findOneBy({ id: id });
    if (!entity) throw new ResourceNotFoundError(id);
    return CategoryResponseDto.fromEntity(entity);
  }

  async update(
    id: number,
    dto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category = await this.categoryRepo.findOneBy({ id: id });
    if (!category) throw new ResourceNotFoundError(id);
    category.name = dto.name ?? category.name;
    const entity = await this.saveCategory(category);
    return CategoryResponseDto.fromEntity(entity);
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepo.findOneBy({ id: id });
    if (!category) throw new ResourceNotFoundError(id);
    await this.categoryRepo.remove(category);
  }
}
