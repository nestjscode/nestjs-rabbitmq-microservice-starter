import { RmqContext, RmqOptions } from '@nestjs/microservices';
import { RabbitMqModuleOptions } from './types';

export interface RabbitMqServiceInterface {
  getRmqOptions(options: RabbitMqModuleOptions): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}
