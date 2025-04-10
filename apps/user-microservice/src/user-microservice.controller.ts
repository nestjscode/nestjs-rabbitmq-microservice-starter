import { Controller } from '@nestjs/common';
import { UserMicroserviceService } from './user-microservice.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserMicroserviceController {
  constructor(
    private readonly userMicroserviceService: UserMicroserviceService,
  ) {}

  @MessagePattern('user.get')
  getUser(): string {
    return this.userMicroserviceService.getUser();
  }
}
