import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModuleAsyncOptions } from '@nestjs/common/cache';
import { CacheModule } from '@nestjs/cache-manager';
import * as Joi from 'joi';
import { redisStore } from 'cache-manager-redis-store';
import { RmqModule } from '@app/common';
import { ReceiverController } from './receiver.controller';
import { ReceiverService } from './receiver.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RMQ_URI: Joi.string().required(),
        RMQ_RECEIVER_QUEUE: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
      }),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: parseInt(configService.get<string>('REDIS_PORT')!),
          },
        });
        return {
          store: () => store,
        };
      },
      inject: [ConfigService],
    } as CacheModuleAsyncOptions),
    RmqModule,
  ],
  controllers: [ReceiverController],
  providers: [ReceiverService],
})
export class ReceiverModule {}
