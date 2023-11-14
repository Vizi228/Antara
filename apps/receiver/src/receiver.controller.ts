import { Controller, Get, Inject } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ReceiverService } from './receiver.service';

@Controller()
export class ReceiverController {
  constructor(
    private readonly receiverService: ReceiverService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  getHello(): string {
    return this.receiverService.getHello();
  }

  @EventPattern('receive')
  async receive(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data, context);
  }
}
