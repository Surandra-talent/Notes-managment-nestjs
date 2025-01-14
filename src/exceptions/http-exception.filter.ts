import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Console } from 'console';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('exception22',exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message || 'An unexpected error occurred';

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
       // timestamp: new Date().toISOString(),
       // path: request.url,
      });
  }
}