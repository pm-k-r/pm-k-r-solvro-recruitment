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
  Query,
} from '@nestjs/common';
import { CocktailsService } from './cocktails.service.js';
import { CreateCocktailDto } from './dto/create-cocktail.dto.js';
import { UpdateCocktailDto } from './dto/update-cocktail.dto.js';
import { IdPipe } from '../common/id-pipe.service.js';
import { FindCocktailsQueryDto } from './dto/find-cocktails-query.dto.js';

@Controller('cocktails')
export class CocktailsController {
  constructor(private readonly cocktailsService: CocktailsService) {}

  @Post()
  create(@Body() createCocktailDto: CreateCocktailDto) {
    return this.cocktailsService.create(createCocktailDto);
  }

  @Get()
  findAll(@Query() findCocktailsQueryDto: FindCocktailsQueryDto) {
    return this.cocktailsService.findAll(findCocktailsQueryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe, IdPipe) id: number) {
    return this.cocktailsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe, IdPipe) id: number,
    @Body() updateCocktailDto: UpdateCocktailDto,
  ) {
    return this.cocktailsService.update(id, updateCocktailDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe, IdPipe) id: number) {
    return this.cocktailsService.remove(id);
  }
}
