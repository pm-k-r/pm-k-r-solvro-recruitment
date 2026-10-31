import { Cocktail } from '../entities/cocktail.entity.js';
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { G_CONST } from '../../common/global-constants.js';
import { Type } from 'class-transformer';

const SORT_OPTIONS: Array<keyof Cocktail> = [
  'id',
  'name',
  'categoryId',
  'createdAt',
] as const;
const ORDER_OPTIONS: Array<string> = ['asc', 'desc'] as const;
const ALCOHOL_OPTIONS: Array<string> = ['yes', 'no', 'maybe'] as const;

export class FindCocktailsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsString()
  @IsIn(SORT_OPTIONS)
  sort?: keyof Cocktail;

  @IsOptional()
  @IsString()
  @IsIn(ORDER_OPTIONS)
  order?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(G_CONST.DB_INT_MAX)
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  ingredientId: number;

  @IsOptional()
  @IsString()
  @IsIn(ALCOHOL_OPTIONS)
  hasAlcohol?: 'yes' | 'no' | 'maybe';
}
