import { NestFactory } from '@nestjs/core';
import { UserMicroserviceModule } from './user-microservice.module';
import { ConfigService } from '@nestjs/config';
import { RabbitMqService, RabbitMqServiceInterface } from '@app/rabbitmq';

async function bootstrap() {
  const app = await NestFactory.create(UserMicroserviceModule);

  const configService = app.get(ConfigService);
  const rabbitMqService: RabbitMqServiceInterface = app.get(RabbitMqService);

  const queue = configService.get<string>('RABBITMQ_USER_QUEUE');

  app.connectMicroservice(rabbitMqService.getRmqOptions(queue!));
  await app.startAllMicroservices();
}
bootstrap();
