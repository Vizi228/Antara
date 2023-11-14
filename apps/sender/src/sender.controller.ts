import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SenderService } from './sender.service';
import { RECEIVER_SERVICE } from './constants/services';

@Controller()
export class SenderController {
  constructor(
    private readonly senderService: SenderService,
    @Inject(RECEIVER_SERVICE) private receiverService: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    this.receiverService.emit('receive', { msg: 'test' });
    return this.senderService.getHello();
  }
}
