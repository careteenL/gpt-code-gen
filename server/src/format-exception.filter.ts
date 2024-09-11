import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express'

@Catch(HttpException)
export class FormatExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()
    response.statusCode = exception.getStatus()
    response
      .json({
        code: exception.getStatus(),
        msg: 'fail',
        data: (exception.getResponse() as any)?.message || exception.message,
      })
      .end();
  }
}
