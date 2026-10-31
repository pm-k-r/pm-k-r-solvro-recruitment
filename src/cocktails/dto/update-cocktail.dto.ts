import { PartialType } from '@nestjs/swagger';
import { CreateCocktailDto } from './create-cocktail.dto.js';

export class UpdateCocktailDto extends PartialType(CreateCocktailDto) {}
