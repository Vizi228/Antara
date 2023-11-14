import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SenderModule } from './sender.module';

async function bootstrap() {
  const app = await NestFactory.create(SenderModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
