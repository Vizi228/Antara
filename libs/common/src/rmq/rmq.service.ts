import { Injectable } from "@nestjs/common";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>("RMQ_URI")],
        queue: this.configService.get<string>(`RMQ_${queue}_QUEUE`),
        noAck,
        persistent: true
      }
    }
  }
}
