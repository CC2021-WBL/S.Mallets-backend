import { Test, TestingModule } from '@nestjs/testing';

import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const userMockWithoutId = {
  email: 'matylda@wp.pl',
  name: 'Matylda',
  surname: 'Borutka',
  phoneNumber: 503609112,
  roles: 'user',
  modifiedAt: '2022-05-06T17:17:47.436Z',
  createdAt: '2022-05-06T17:18:15.319Z',
};

describe('UsersController', () => {
  let usersController: UsersController;
  const mockUserService = {
    findOneById: jest.fn((id) => {
      return {
        id: id,
        ...userMockWithoutId,
      };
    }),
    updateUser: jest.fn((userData: UpdateUserDto, id: number) => {
      for (const key in userData) {
        if (Object.prototype.hasOwnProperty.call(userData, key)) {
          userMockWithoutId[key] = userData[key];
        }
      }
      return {
        id: id,
        ...userMockWithoutId,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should get the user', () => {
    const id: any = 10;
    expect(usersController.getById(id)).toEqual(
      new Promise((resolve, reject) => {
        resolve({
          id: 10,
          email: 'matylda@wp.pl',
          name: expect.any(String),
          surname: expect.any(String),
          phoneNumber: expect.any(Number),
          roles: 'user',
          modifiedAt: expect.any(String),
          createdAt: '2022-05-06T17:18:15.319Z',
        });
      }),
    );
    expect(mockUserService.findOneById).toHaveBeenCalled();
  });

  it('should update a user', () => {
    const id: any = 10;
    expect(usersController.updateUser(id, { phoneNumber: 6666666666 })).toEqual(
      new Promise((resolve, reject) => {
        resolve({
          id: 10,
          email: 'matylda@wp.pl',
          name: expect.any(String),
          surname: expect.any(String),
          phoneNumber: 6666666666,
          roles: 'user',
          modifiedAt: expect.any(String),
          createdAt: '2022-05-06T17:18:15.319Z',
        });
      }),
    );
    expect(mockUserService.updateUser).toHaveBeenCalled();
  });
});
