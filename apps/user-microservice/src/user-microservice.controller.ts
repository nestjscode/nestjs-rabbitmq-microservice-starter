import { Controller, UseGuards } from '@nestjs/common';
import { UserMicroserviceService } from './user-microservice.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';
import {
  RequestType,
  UserServicePattern,
  type UserServiceContract,
} from '@app/contracts';
import { ServiceSecretGuard } from '@app/core';

@Controller()
@UseGuards(ServiceSecretGuard)
export class UserMicroserviceController {
  constructor(
    private readonly userMicroserviceService: UserMicroserviceService,
  ) {}

  @MessagePattern<UserServicePattern>('user.get')
  getUser(
    @Payload() data: RequestType<UserServiceContract, 'user.get'>,
    @Ctx() context: RmqContext,
  ): string {
    const {
      properties: { headers },
    } = context.getMessage();

    console.log(headers, data);
    return this.userMicroserviceService.getUser();
  }

  @MessagePattern<UserServicePattern>('user.create')
  create(
    @Payload() data: RequestType<UserServiceContract, 'user.create'>,
    @Ctx() context: RmqContext,
  ) {
    const {
      properties: { headers },
    } = context.getMessage();

    return this.userMicroserviceService.create(data);
  }
}
