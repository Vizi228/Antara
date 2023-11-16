import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ReceiverService } from './receiver.service';
import { Operation } from '@app/common';

@Controller()
export class ReceiverController {
  constructor(private readonly receiverService: ReceiverService) {}

  @MessagePattern('load')
  async load() {
    return await this.receiverService.getAll();
  }

  @MessagePattern('receiveSync')
  async receiveSync(@Payload() data: Operation) {
    return await this.receiverService.saveOperation(data);
  }

  @EventPattern('receiveAsync')
  async receiveAsync(@Payload() data: Operation, @Ctx() context: RmqContext) {
    await this.receiverService.saveOperation(data);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }

  @MessagePattern('status')
  async status(@Payload() operation: { id: string }) {
    return await this.receiverService.getStatus(operation.id);
  }

  @EventPattern('clear')
  async clear(@Payload() _: any, @Ctx() context: RmqContext) {
    await this.receiverService.clear();

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
