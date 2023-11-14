import { NestFactory } from '@nestjs/core';
import { ReceiverModule } from './receiver.module';

async function bootstrap() {
  const app = await NestFactory.create(ReceiverModule);
  await app.listen(3000);
}
bootstrap();
