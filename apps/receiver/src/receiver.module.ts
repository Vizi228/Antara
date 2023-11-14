import { Module } from '@nestjs/common';
import { ReceiverController } from './receiver.controller';
import { ReceiverService } from './receiver.service';

@Module({
  imports: [],
  controllers: [ReceiverController],
  providers: [ReceiverService],
})
export class ReceiverModule {}
