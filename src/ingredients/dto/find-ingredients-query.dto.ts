import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

const ALCOHOL_OPTIONS: Array<string> = ['yes', 'no', 'maybe'] as const;

export class FindIngredientsQueryDto {
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
  @IsIn(ALCOHOL_OPTIONS)
  isAlcohol?: 'yes' | 'no' | 'maybe';
}
