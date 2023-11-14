import { Controller, Get } from '@nestjs/common';
import { ReceiverService } from './receiver.service';

@Controller()
export class ReceiverController {
  constructor(private readonly receiverService: ReceiverService) {}

  @Get()
  getHello(): string {
    return this.receiverService.getHello();
  }
}
