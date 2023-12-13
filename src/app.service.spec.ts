import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { LoggerService } from './core/logger/logger.service';
import { CacheService } from './core/cache/cache.service';
import { DatabaseService } from './database/database.service';
import { mockDeep } from 'jest-mock-extended';
import { createMock } from '@golevelup/ts-jest';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: LoggerService,
          useValue: createMock<LoggerService>(),
        },
        {
          provide: CacheService,
          useValue: createMock<CacheService>(),
        },
        {
          provide: DatabaseService,
          useValue: mockDeep<DatabaseService>(),
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      // cacheService.get.mockResolvedValue(`VALUE FROM`);
      const result = await appService.getHello();
      expect(result).toBe('Hello world');
    });
  });
});
