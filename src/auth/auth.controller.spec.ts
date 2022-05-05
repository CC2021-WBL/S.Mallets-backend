import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Role } from './types/role.enum';

describe('AuthController', () => {
  let authController: AuthController;
  const mockAuthService = {
    register: jest.fn(async (object) => {
      const resObj = {
        ...object,
        id: 1,
        roles: [Role.User],
        modifiedAt: new Date(),
        createdAt: new Date(),
      };
      return new Promise((resolve, reject) => {
        resolve(resObj);
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });
  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should register new user', () => {
    const userObj = {
      email: 'matylda@wp.pl',
      password: '123456',
      name: 'Matylda',
      surname: 'Borutka',
      phoneNumber: 503609112,
    };
    expect(authController.register(userObj)).toEqual(
      new Promise((resolve, reject) => {
        resolve({
          id: expect.any(Number),
          email: 'matylda@wp.pl',
          name: 'Matylda',
          surname: 'Borutka',
          phoneNumber: 503609112,
          roles: [Role.User],
          modifiedAt: expect.any(Date),
          createdAt: expect.any(Date),
        });
      }),
    );
  });
});
