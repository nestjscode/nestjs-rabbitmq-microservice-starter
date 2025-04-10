import { ServicePattern } from '../types';
import { type CreateUserDto } from './create-user.dto';
import { type UserDto } from './user.dto';

export type UserServicePattern = 'user.get' | 'user.create';

export interface UserServiceContract {
  'user.get': ServicePattern<number, UserDto>;
  'user.create': ServicePattern<CreateUserDto, UserDto>;
}
