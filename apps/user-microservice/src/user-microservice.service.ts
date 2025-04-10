import { RequestType, UserServiceContract } from '@app/contracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMicroserviceService {
  getUser(): string {
    return 'User Microservice return user Rmq options';
  }

  create(createUserDto: RequestType<UserServiceContract, 'user.create'>) {
    return createUserDto;
  }
}
