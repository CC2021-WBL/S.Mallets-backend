import { UpdateUserDto } from './dto/update-user.dto';
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

  async create(userData: User): Promise<User | null> {
    const prepairedUser = await this.usersRepository.create(userData);
    const addedUser = await this.usersRepository.save(prepairedUser);
    if (addedUser) {
      addedUser.hash = undefined;
      return addedUser;
    }
    return null;
  }

  async updateUser(userData: UpdateUserDto, id: number): Promise<User> {
    const user = await this.findOneById(id);
    for (const key in userData) {
      if (Object.prototype.hasOwnProperty.call(userData, key)) {
        user[key] = userData[key];
      }
    }
    const updatedUser = await this.usersRepository.save(user);
    if (!updatedUser) {
      throw new HttpException('Updating user failed', HttpStatus.BAD_REQUEST);
    }
    return updatedUser;
  }

  async deleteUser(id: number) {
    const deleteResult = await this.usersRepository.delete(id);
    if (!deleteResult.affected) {
      throw new HttpException('user deletion failed', HttpStatus.BAD_REQUEST);
    }
    return deleteResult;
  }
}
