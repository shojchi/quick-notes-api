import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getGoodbye', () => {
    it('should return "Goodbye World!"', () => {
      expect(appController.getGoodbye()).toBe('Goodbye World!');
    });
  });
});

// ========================================
// ADVANCED: Testing with Mocked Service
// ========================================

describe('AppController (with mocks)', () => {
  let appController: AppController;
  let appService: AppService;

  // Create mock service
  const mockAppService = {
    getHello: jest.fn(() => 'Mocked Hello!'),
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // 🎯 Reset mocks before each test!

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService, // 🎯 Replace real service
          useValue: mockAppService, // 🎭 With mock
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getHello with mock', () => {
    it('should return mocked value', () => {
      const result = appController.getHello();

      // Verify mock was called
      expect(appService.getHello).toHaveBeenCalled();

      // Verify return value
      expect(result).toBe('Mocked Hello!');
    });

    it('should call service method once', () => {
      appController.getHello();
      expect(appService.getHello).toHaveBeenCalledTimes(1);
    });
  });
});
