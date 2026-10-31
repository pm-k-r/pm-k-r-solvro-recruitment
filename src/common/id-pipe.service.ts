import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  PipeTransform,
} from '@nestjs/common';
import { G_CONST } from './global-constants.js';

@Injectable()
export class IdPipe implements PipeTransform<number, number> {
  transform(value: number, metadata: ArgumentMetadata): number {
    if (typeof value !== 'number' || isNaN(value))
      throw new InternalServerErrorException(
        'A non-number was passed into the IdPipe.',
      );

    const param =
      metadata.type == 'param' ? (metadata.data ?? 'Value') : 'Value';

    if (value < 1)
      throw new BadRequestException(`${param} must not be less than 1`);
    else if (value > G_CONST.DB_INT_MAX)
      throw new BadRequestException(
        `${param} must not be greater than ${G_CONST.DB_INT_MAX}`,
      );

    return value;
  }
}
