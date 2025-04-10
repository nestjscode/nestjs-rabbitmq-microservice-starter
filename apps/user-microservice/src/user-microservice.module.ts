import { Module } from '@nestjs/common';
import { UserMicroserviceController } from './user-microservice.controller';
import { UserMicroserviceService } from './user-microservice.service';
import { RabbitMqModule } from '@app/rabbitmq';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [RabbitMqModule, DatabaseModule],
  controllers: [UserMicroserviceController],
  providers: [UserMicroserviceService],
})
export class UserMicroserviceModule {}
