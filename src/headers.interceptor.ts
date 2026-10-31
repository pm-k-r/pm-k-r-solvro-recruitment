import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && (data._links || data._embedded)) {
          context
            .switchToHttp()
            .getResponse<Response>()
            .setHeader('Content-Type', 'application/hal+json');
        }
        return data;
      }),
    );
  }
}
