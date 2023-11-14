import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from '@app/common';
import { SenderService } from './sender.service';
import { SenderController } from './sender.controller';
import { RECEIVER_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RMQ_URI: Joi.string().required(),
        RMQ_RECEIVER_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule.register({ name: RECEIVER_SERVICE }),
  ],
  controllers: [SenderController],
  providers: [SenderService],
})
export class SenderModule {}
