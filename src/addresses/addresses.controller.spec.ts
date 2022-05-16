import { Test, TestingModule } from '@nestjs/testing';

import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { UsersService } from './../users/users.service';

const mockReqWithUser: any = {
  user: {
    address: 3,
  },
};

const addressMockWithoutId = {
  country: 'Polska',
  city: 'Sopot',
  street: 'Polna',
  numberOfHouse: '15/2',
  zipCode: '85-222',
  modifiedAt: '2022-05-09T15:45:33.153Z',
  createdAt: '2022-05-09T19:45:48.712Z',
};

describe('AddressesController', () => {
  let controller: AddressesController;
  const mockUsersService = {};
  const mockAddressService = {
    getCurrentUserAddress: jest.fn((req: any) => {
      return { id: req.address, ...addressMockWithoutId };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [UsersService, AddressesService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(AddressesService)
      .useValue(mockAddressService)
      .compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get the address', () => {
    expect(controller.getAddress(mockReqWithUser)).toEqual(
      new Promise((resolve, reject) => {
        resolve({
          country: 'Polska',
          city: 'Sopot',
          street: 'Polna',
          numberOfHouse: '15/2',
          zipCode: '85-222',
          id: mockReqWithUser.user.address,
          modifiedAt: expect.any(String),
          createdAt: expect.any(String),
        });
      }),
    );
  });
});
