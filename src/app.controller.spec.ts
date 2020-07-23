import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should be defined"', () => {
      expect(appController).toBeDefined();
    });
  });

  describe('helloWorld', () => {
    it("should return 'Hello World!!'", async () => {
      const result = 'Hello World!!';

      jest.spyOn(appController, 'helloWorld');

      expect(await appController.helloWorld()).toBe(result);
    });
  });
});
