import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMicroserviceService {
  getUser(): string {
    return 'User Microservice return user Rmq options';
  }
}
