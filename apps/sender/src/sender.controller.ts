import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Render,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
} from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { RECEIVER_SERVICE } from './constants/services';
import { Operation, Status } from '@app/common';

class SendBody {
  @ApiProperty({
    example: 'Description of operation',
  })
  description: string;

  @ApiProperty({
    example: 12,
  })
  amount: number;
}

class StatusBody {
  @ApiProperty({
    example: '8a48ca8e-cc4f-4757-8ec5-ec4681b62dd3',
  })
  id: string;
}

@Controller()
export class SenderController {
  constructor(@Inject(RECEIVER_SERVICE) private receiverService: ClientProxy) {}

  @Get()
  @Render('index')
  @ApiOperation({ summary: 'Main page' })
  async index(): Promise<{ operations: Operation[] }> {
    const operations = await this.receiverService.send('load', {}).toPromise();
    return { operations };
  }

  @Post('sendSync')
  @ApiOperation({ summary: 'Send sync operation' })
  @ApiBody({ type: SendBody })
  @ApiResponse({ status: 200, type: Operation })
  async sendSync(
    @Body(new ValidationPipe({ transform: true })) operation: Operation,
  ): Promise<void> {
    return await this.receiverService
      .send('receiveSync', {
        id: uuidv4(),
        status: Status.Registered,
        timestamp: Date.now(),
        ...operation,
      })
      .toPromise();
  }

  @Post('sendAsync')
  @ApiOperation({ summary: 'Send async operation' })
  @ApiBody({
    type: SendBody,
  })
  @ApiResponse({ status: 200, type: Operation })
  sendAsync(
    @Body(new ValidationPipe({ transform: true }))
    operation: Operation,
  ): Operation {
    const newOperation: Operation = {
      ...operation,
      id: uuidv4(),
      timestamp: Date.now(),
      status: Status.Registered,
    };
    this.receiverService.emit('receiveAsync', newOperation);
    return newOperation;
  }

  @Post('status')
  @ApiOperation({ summary: 'Get operation status' })
  @ApiBody({
    type: StatusBody,
  })
  @ApiResponse({ status: 200, description: 'Status as number' })
  async getStatus(
    @Body(new ValidationPipe({ transform: true }))
    operation: Partial<Operation>,
  ): Promise<void> {
    return await this.receiverService
      .send('status', { id: operation.id })
      .toPromise();
  }

  @Post('clear')
  @ApiOperation({ summary: 'Clear all Done operations' })
  clearOperations(): void {
    this.receiverService.emit('clear', {});
  }
}
