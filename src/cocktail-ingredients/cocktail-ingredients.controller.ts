import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { CocktailIngredientsService } from './cocktail-ingredients.service.js';
import { AddCocktailIngredientDto } from './dto/add-cocktail-ingredient.dto.js';
import { IdPipe } from '../common/id-pipe.service.js';
import { UpdateCocktailIngredientDto } from './dto/update-cocktail-ingredient.dto.js';
import { CocktailIngredientsInterceptor } from './cocktail-ingredients.interceptor.js';

@Controller('cocktails/:cid/ingredients')
@UseInterceptors(CocktailIngredientsInterceptor)
export class CocktailIngredientsController {
  constructor(
    private readonly cocktailIngredientsService: CocktailIngredientsService,
  ) {}

  @Post()
  add(
    @Param('cid') cid: number,
    @Body() addCocktailIngredientDto: AddCocktailIngredientDto,
  ) {
    return this.cocktailIngredientsService.add(cid, addCocktailIngredientDto);
  }

  @Get()
  findAll(@Param('cid') cid: number) {
    return this.cocktailIngredientsService.findAll(cid);
  }

  @Get(':iid')
  findOne(
    @Param('cid') cid: number,
    @Param('iid', ParseIntPipe, IdPipe) iid: number,
  ) {
    return this.cocktailIngredientsService.findOne(cid, iid);
  }

  @Patch(':iid')
  update(
    @Param('cid') cid: number,
    @Param('iid', ParseIntPipe, IdPipe) iid: number,
    @Body() updateCocktailIngredientDto: UpdateCocktailIngredientDto,
  ) {
    return this.cocktailIngredientsService.update(
      cid,
      iid,
      updateCocktailIngredientDto,
    );
  }

  @Delete(':iid')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('cid') cid: number,
    @Param('iid', ParseIntPipe, IdPipe) iid: number,
  ) {
    return this.cocktailIngredientsService.remove(cid, iid);
  }
}
