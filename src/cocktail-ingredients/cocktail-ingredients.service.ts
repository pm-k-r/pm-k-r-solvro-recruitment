import { Injectable } from '@nestjs/common';
import { AddCocktailIngredientDto } from './dto/add-cocktail-ingredient.dto.js';
import { UpdateCocktailIngredientDto } from './dto/update-cocktail-ingredient.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { CocktailIngredient } from './entities/cocktail-ingredient.entity.js';
import { QueryFailedError, Repository } from 'typeorm';
import {
  RelatedResourceNotPresentError,
  ResourceAlreadyExistsError,
  ResourceNotFoundError,
} from '../common/domain.errors.js';
import { CocktailIngredientResponseDto } from './dto/cocktail-ingredient-response.dto.js';
import { FindCocktailIngredientsDto } from './dto/find-cocktail-ingredients.dto.js';

@Injectable()
export class CocktailIngredientsService {
  constructor(
    @InjectRepository(CocktailIngredient)
    private ciRepo: Repository<CocktailIngredient>,
  ) {}

  private async saveCocktailIngredient(
    ci: CocktailIngredient,
  ): Promise<CocktailIngredient> {
    let entity: CocktailIngredient;
    try {
      entity = await this.ciRepo.save(ci);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError?.code == '23503'
      ) {
        throw new RelatedResourceNotPresentError(error.driverError?.detail);
      } else if (
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

  async add(
    cid: number,
    dto: AddCocktailIngredientDto,
  ): Promise<CocktailIngredientResponseDto> {
    const exists = await this.ciRepo.existsBy({
      cocktailId: cid,
      ingredientId: dto.ingredientId,
    });
    if (exists) {
      throw new ResourceAlreadyExistsError(
        `Cocktail with ID ${cid} already has ingredient with ID ${dto.ingredientId}`,
      );
    }

    const ci = new CocktailIngredient();
    ci.cocktailId = cid;
    ci.ingredientId = dto.ingredientId;
    ci.amount = dto.amount;
    ci.unit = dto.unit;
    const entity = await this.saveCocktailIngredient(ci);
    return CocktailIngredientResponseDto.fromEntity(entity);
  }

  async findAll(cid: number): Promise<FindCocktailIngredientsDto> {
    const entities = await this.ciRepo.find({
      where: { cocktailId: cid },
      relations: { ingredient: true },
    });
    return FindCocktailIngredientsDto.build(entities, cid);
  }

  async findOne(
    cid: number,
    iid: number,
  ): Promise<CocktailIngredientResponseDto> {
    const entity = await this.ciRepo.findOne({
      where: { cocktailId: cid, ingredientId: iid },
      relations: { ingredient: true, cocktail: true },
    });
    if (!entity) throw new ResourceNotFoundError(iid);
    return CocktailIngredientResponseDto.fromEntity(entity);
  }

  async update(
    cid: number,
    iid: number,
    dto: UpdateCocktailIngredientDto,
  ): Promise<CocktailIngredientResponseDto> {
    const ci = await this.ciRepo.findOneBy({
      cocktailId: cid,
      ingredientId: iid,
    });
    if (!ci) throw new ResourceNotFoundError(iid);
    ci.ingredientId = dto.ingredientId ?? ci.ingredientId;
    ci.amount = dto.amount ?? ci.amount;
    ci.unit = dto.unit ?? ci.unit;
    const entity = await this.saveCocktailIngredient(ci);
    return CocktailIngredientResponseDto.fromEntity(entity);
  }

  async remove(cid: number, iid: number): Promise<void> {
    const ci = await this.ciRepo.findOneBy({
      cocktailId: cid,
      ingredientId: iid,
    });
    if (!ci) throw new ResourceNotFoundError(iid);
    await this.ciRepo.remove(ci);
  }
}
