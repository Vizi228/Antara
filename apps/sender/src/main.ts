import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join, resolve } from 'path';
import { SenderModule } from './sender.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SenderModule);

  app.setBaseViewsDir(join(resolve(), 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('Antara API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
