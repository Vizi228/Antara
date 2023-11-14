import { Test, TestingModule } from '@nestjs/testing';
import { ReceiverController } from './receiver.controller';
import { ReceiverService } from './receiver.service';

describe('ReceiverController', () => {
  let receiverController: ReceiverController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReceiverController],
      providers: [ReceiverService],
    }).compile();

    receiverController = app.get<ReceiverController>(ReceiverController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(receiverController.getHello()).toBe('Hello World!');
    });
  });
});
