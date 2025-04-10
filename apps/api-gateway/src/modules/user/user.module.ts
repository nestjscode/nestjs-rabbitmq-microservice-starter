import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RabbitMqModule } from '@app/rabbitmq';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RabbitMqModule.registerRmqRorRootAsync({
      provide: 'USER_CLIENT',
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          queue: config.get<string>('RABBITMQ_USER_QUEUE')!,
          headers: {
            'x-service-auth': config.get<string>(
              'SERVICE_SECRET',
              'default_secret',
            ),
          },
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
