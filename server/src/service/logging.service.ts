import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const now = Date.now();
      const request = context.switchToHttp().getRequest();

      return next.handle().pipe(
        tap(() => {
          const responseTime = Date.now() - now;
          const statusCode = context.switchToHttp().getResponse().statusCode;
          const isSlowRequest = responseTime > 500; //>500ms
          console.log(`| SlowRequest: ${isSlowRequest} | Request to ${request.method} ${request.url} took ${responseTime}ms | Status: ${statusCode} |`);
        }),
      );
    }
  }