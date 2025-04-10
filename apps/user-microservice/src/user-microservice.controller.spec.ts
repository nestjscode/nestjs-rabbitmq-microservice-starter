import { Test, TestingModule } from '@nestjs/testing';
import { UserMicroserviceController } from './user-microservice.controller';
import { UserMicroserviceService } from './user-microservice.service';

describe('UserMicroserviceController', () => {
  let userMicroserviceController: UserMicroserviceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserMicroserviceController],
      providers: [UserMicroserviceService],
    }).compile();

    userMicroserviceController = app.get<UserMicroserviceController>(
      UserMicroserviceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userMicroserviceController.getHello()).toBe('Hello World!');
    });
  });
});
