import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import {
  RelatedResourceNotPresentError,
  ResourceAlreadyExistsError,
  ResourceNotFoundError,
} from './common/domain.errors.js';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AppExceptionFilter extends BaseExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    if (error instanceof ResourceNotFoundError)
      super.catch(new NotFoundException(error.message), host);
    else if (error instanceof RelatedResourceNotPresentError)
      super.catch(new BadRequestException(error.message), host);
    else if (error instanceof ResourceAlreadyExistsError)
      super.catch(new ConflictException(error.message), host);
    else super.catch(error, host);
  }
}
