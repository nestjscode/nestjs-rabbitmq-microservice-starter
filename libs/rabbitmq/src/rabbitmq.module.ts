import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { RabbitMqService } from './rabbitmq.service';
import type {
  RabbitMqModuleAsyncOptions,
  RabbitMqModuleOptions,
} from './types';
import { type TypeSafeClientProxy } from './proxy/typesafe-client.proxy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {
  static registerRmq(
    service: string,
    options: RabbitMqModuleOptions,
  ): DynamicModule {
    const providers = [
      {
        provide: service,
        useFactory: (configService: ConfigService) => {
          const USER = configService.get<string>('RABBITMQ_DEFAULT_USER');
          const PASSWORD = configService.get<string>('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get<string>('RABBITMQ_HOST');

          const client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
              queueOptions: {
                durable: true,
              },
              ...options,
            },
          }) as TypeSafeClientProxy;
          return client;
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: RabbitMqModule,
      providers,
      exports: providers,
    };
  }

  static registerRmqRorRootAsync(
    options: RabbitMqModuleAsyncOptions,
  ): DynamicModule {
    const { inject, provide, imports, useFactory } = options;

    const providers = [
      {
        provide: provide,
        useFactory: async (configService: ConfigService) => {
          const options = await useFactory(configService);

          // Retrieve configuration values from the config service
          const USER = configService.get<string>('RABBITMQ_DEFAULT_USER');
          const PASSWORD = configService.get<string>('RABBITMQ_DEFAULT_PASS');
          const HOST = configService.get<string>('RABBITMQ_HOST');

          // Create and return the RabbitMQ client
          const client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
              queueOptions: {
                durable: true,
              },
              ...options,
            },
          }) as TypeSafeClientProxy;
          return client;
        },
        inject: [...inject],
      },
    ];

    return {
      module: RabbitMqModule,
      imports,
      providers,
      exports: providers,
    };
  }
}
