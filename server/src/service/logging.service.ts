import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import chalk from 'chalk';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        const statusCode = context.switchToHttp().getResponse().statusCode;
        const isSlowRequest = responseTime > 500; // >500ms
        const colorSpeedRequest = isSlowRequest ? chalk.red(isSlowRequest) : chalk.green(isSlowRequest);
        const colorStatus = statusCode >= 400 ? chalk.red(statusCode) : chalk.green(statusCode);
        const colorRequestMs = responseTime > 500 ? chalk.red(responseTime + 'ms') : chalk.green(responseTime + 'ms');
        console.log(`| SlowRequest: ${colorSpeedRequest} | Request to ${request.method} ${request.url} | took ${colorRequestMs} | Status: ${colorStatus} |`);
      }),
    );
  }
}