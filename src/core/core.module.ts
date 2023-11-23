import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import { LoggerService } from './logger/logger.service';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { LoggerMiddleware } from './logger/logger.middleware';
import { RequestMethod } from '@nestjs/common/enums';
import { DatabaseModule } from 'src/database/database.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    LoggerService,
  ],
  exports: [LoggerService],
})
export class CoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
