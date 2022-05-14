import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Address } from './address.entity';
import { AddressesService } from './addresses.service';

const mockAddressDto = {
  country: 'Polska',
  city: 'Sopot',
  street: 'Polna',
  numberOfHouse: '15/2',
  zipCode: '85-222',
};

describe('AddressesService', () => {
  let service: AddressesService;

  const mockAddressesRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((address) =>
      Promise.resolve({
        id: 1,
        ...address,
        createdAt: new Date(),
        modifiedAt: new Date(),
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressesRepository,
        },
      ],
    }).compile();

    service = module.get<AddressesService>(AddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    expect(await service.createAddress(mockAddressDto)).toEqual({
      id: expect.any(Number),
      country: expect.any(String),
      city: expect.any(String),
      street: expect.any(String),
      numberOfHouse: expect.any(String),
      zipCode: expect.any(String),
      modifiedAt: expect.any(Date),
      createdAt: expect.any(Date),
    });
  });
});
