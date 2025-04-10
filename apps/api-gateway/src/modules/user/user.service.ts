import { UserServiceContract } from '@app/contracts';
import { TypeSafeClientProxy } from '@app/rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: TypeSafeClientProxy<UserServiceContract>,
  ) {}

  findOne(id: number) {
    console.log('getting user of ', id);
    return this.client.send('user.get', id);
  }

  create(createUserDto: any) {
    return this.client.send('user.create', createUserDto);
  }
}
