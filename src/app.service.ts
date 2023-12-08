import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';

@Injectable()
export class AppService {
  private context = `AppService`;
  constructor(private readonly logger: LoggerService) {}
  getHello() {
    this.logger.log(`calling log from inside getHello method`, this.context, {
      userId: 123,
      isPremium: true,
    });
    return `Hello world`;
  }
}
