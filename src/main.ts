import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common/pipes';
import { LoggerService } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // add global validation pipe
  await app.listen(4000);
}
bootstrap();
