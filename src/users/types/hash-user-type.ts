import { CreateUserDto } from '../create-user.dto';

export type HashUser = Omit<CreateUserDto, 'password'> & { hash: string };
