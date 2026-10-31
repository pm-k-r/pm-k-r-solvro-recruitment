import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { G_CONST } from '../../common/global-constants.js';

export class CreateCocktailDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @IsInt()
  @Min(1)
  @Max(G_CONST.DB_INT_MAX)
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(8000)
  instructions: string;
}
