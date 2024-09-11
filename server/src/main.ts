import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatResponseInterceptor } from './format-response.interceptor';
import { FormatExceptionFilter } from './format-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new FormatResponseInterceptor())
  app.useGlobalFilters(new FormatExceptionFilter())
  app.enableCors();
  await app.listen(8701);
}
bootstrap();
