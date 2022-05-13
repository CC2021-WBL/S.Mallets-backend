import { CreateUserDto } from '../dto/create-user.dto';

export type HashUser = Omit<CreateUserDto, 'password'> & { hash: string };
