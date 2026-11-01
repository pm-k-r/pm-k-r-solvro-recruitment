import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { G_CONST } from '../common/global-constants.js';
import { Cocktail } from '../cocktails/entities/cocktail.entity.js';
import { ResourceNotFoundError } from '../common/domain.errors.js';

@Injectable()
export class CocktailIngredientsInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(Cocktail)
    private readonly cocktailRepo: Repository<Cocktail>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const bre = new BadRequestException(
      `The cocktail id parameter must be an integer between 1 and ${G_CONST.DB_INT_MAX}`,
    );
    const rawCid = context.switchToHttp().getRequest<Request>().params.cid;
    if (Array.isArray(rawCid)) throw bre;
    const floatCid = parseFloat(rawCid);
    if (!isNaN(floatCid) && !Number.isInteger(floatCid)) throw bre;
    const cid = parseInt(rawCid, 10);
    if (isNaN(cid) || cid < 1 || cid > G_CONST.DB_INT_MAX) {
      throw bre;
    }

    const exists = await this.cocktailRepo.existsBy({ id: cid });
    if (!exists) throw new ResourceNotFoundError(cid);

    return next.handle();
  }
}
