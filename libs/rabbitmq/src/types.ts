import { RmqOptions } from '@nestjs/microservices';

export type RmqOptionsType = RmqOptions['options'];

export type RabbitMqModuleOptions = RmqOptionsType & {};

export interface RabbitMqModuleAsyncOptions {
  provide: string;
  inject: any[];
  imports: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<RabbitMqModuleOptions> | RabbitMqModuleOptions;
}
