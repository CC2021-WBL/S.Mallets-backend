import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
    }
    user.hash = undefined;
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async findOneByCurrentField(fieldName: keyof User, value: any) {
    if (typeof value === typeof User[fieldName]) {
      const user = await this.usersRepository.findOne({
        where: {
          [fieldName]: value,
        },
      });
      if (user) {
        user.hash = undefined;
        return user;
      }
    }
    throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
  }
  async getAll() {
    const users = await this.usersRepository.find();
    if (!users) {
      throw new HttpException('Not found users', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async create(userData: User): Promise<any> {
    const prepairedUser = await this.usersRepository.create(userData);
    const addedUser = await this.usersRepository.save(prepairedUser);
    if (addedUser) {
      addedUser.hash = undefined;
      return addedUser;
    }
    return null;
  }
}
