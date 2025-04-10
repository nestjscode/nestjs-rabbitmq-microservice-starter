import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
  ) {}

  findOne(id: number) {
    console.log('getting user of ', id);
    return this.client.send('user.get', { id: id });
  }
}
