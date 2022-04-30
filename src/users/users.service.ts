import { PreCreateUser } from './users.types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { genPassword } from '../auth/cryptography/passwordUtils';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneById(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    return user;
  }

  //TODO: type string of value --> value should have type as proper field in User
  async findOneByCurrentField(fieldName: keyof User, value: string) {
    console.log(fieldName);
    console.log(value);
    const user = await this.usersRepository.findOne({
      where: {
        [fieldName]: value,
      },
    });
    console.log(user);
    return user;
  }
  async getAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async create(userData: PreCreateUser): Promise<any> {
    try {
      const hashSaltObj = await genPassword(userData.password);
      const prepairedUser = await this.usersRepository.create({
        email: userData.email,
        name: userData.name,
        surname: userData.surname,
        hash: hashSaltObj.hash,
        salt: hashSaltObj.salt,
      });
      const addedUser = await this.usersRepository.save(prepairedUser);
      if (addedUser) {
        return addedUser;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
