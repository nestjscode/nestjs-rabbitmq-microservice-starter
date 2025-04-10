import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  findOne(id: number) {
    return this.client.send('user.get', { id: 123 });
  }
}
