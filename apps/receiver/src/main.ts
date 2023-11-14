import { NestFactory } from '@nestjs/core';
import { ReceiverModule } from './receiver.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ReceiverModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('RECEIVER'));
  await app.startAllMicroservices();
}
bootstrap();
