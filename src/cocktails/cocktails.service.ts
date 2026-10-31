import { Injectable } from '@nestjs/common';
import { CreateCocktailDto } from './dto/create-cocktail.dto.js';
import { UpdateCocktailDto } from './dto/update-cocktail.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Cocktail } from './entities/cocktail.entity.js';
import {
  FindManyOptions,
  FindOptionsWhere,
  In,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { CocktailResponseDto } from './dto/cocktail-response.dto.js';
import {
  RelatedResourceNotPresentError,
  ResourceNotFoundError,
} from '../common/domain.errors.js';
import { FindCocktailsQueryDto } from './dto/find-cocktails-query.dto.js';
import { FindCocktailsResponseDto } from './dto/find-cocktails-response.dto.js';

@Injectable()
export class CocktailsService {
  constructor(
    @InjectRepository(Cocktail)
    private cocktailsRepo: Repository<Cocktail>,
  ) {}

  private async saveCocktail(cocktail: Cocktail): Promise<Cocktail> {
    let entity: Cocktail;
    try {
      entity = await this.cocktailsRepo.save(cocktail);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code == '23503'
      ) {
        throw new RelatedResourceNotPresentError(error.driverError?.detail);
      } else {
        throw error;
      }
    }
    return entity;
  }

  async create(dto: CreateCocktailDto): Promise<CocktailResponseDto> {
    const cocktail = new Cocktail();
    cocktail.name = dto.name;
    cocktail.categoryId = dto.categoryId;
    cocktail.instructions = dto.instructions;
    const entity = await this.saveCocktail(cocktail);
    return CocktailResponseDto.fromEntity(entity);
  }

  async findAll(dto: FindCocktailsQueryDto): Promise<FindCocktailsResponseDto> {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 5;
    const sort = dto.sort ?? 'createdAt';
    const order = dto.order;
    const categoryId = dto.categoryId;
    const ingredientId = dto.ingredientId;
    const hasAlcohol = dto.hasAlcohol ?? 'maybe';

    const optionsWhere: FindOptionsWhere<Cocktail> = {};
    if (categoryId) optionsWhere.categoryId = categoryId;
    if (ingredientId)
      optionsWhere.cocktailIngredients = { ingredientId: ingredientId };
    if (hasAlcohol != 'maybe')
      optionsWhere.cocktailIngredients = {
        ingredient: { isAlcohol: hasAlcohol == 'yes' },
      };

    const [cocktails, total] = await this.cocktailsRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order:
        sort == 'createdAt'
          ? { createdAt: order ?? 'DESC' }
          : { [sort]: order ?? 'ASC', createdAt: 'DESC' },
      relations: { category: true, cocktailIngredients: true },
      where: optionsWhere,
    });
    return FindCocktailsResponseDto.build(cocktails, total, page, limit);
  }

  async findOne(id: number): Promise<CocktailResponseDto> {
    const entity = await this.cocktailsRepo.findOne({
      where: { id: id },
      relations: { category: true, cocktailIngredients: { ingredient: true } },
    });
    if (!entity) throw new ResourceNotFoundError(id);
    return CocktailResponseDto.fromEntity(entity);
  }

  async update(
    id: number,
    dto: UpdateCocktailDto,
  ): Promise<CocktailResponseDto> {
    const cocktail = await this.cocktailsRepo.findOneBy({ id: id });
    if (!cocktail) throw new ResourceNotFoundError(id);
    cocktail.name = dto.name ?? cocktail.name;
    cocktail.categoryId = dto.categoryId ?? cocktail.categoryId;
    cocktail.instructions = dto.instructions ?? cocktail.instructions;
    const entity = await this.saveCocktail(cocktail);
    return CocktailResponseDto.fromEntity(entity);
  }

  async remove(id: number): Promise<void> {
    const cocktail = await this.cocktailsRepo.findOneBy({ id: id });
    if (!cocktail) throw new ResourceNotFoundError(id);
    await this.cocktailsRepo.remove(cocktail);
  }
}
