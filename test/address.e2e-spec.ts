import * as cookieParser from 'cookie-parser';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Address } from '../src/addresses/address.entity';
import { AddressesModule } from './../src/addresses/addresses.module';
import { User } from '../src/users/user.entity';

describe('AddressController (e2e)', () => {
  let app: INestApplication;

  const mockAddressesRepository = {
    findOne: jest.fn().mockResolvedValue({}),
  };
  const mockUsersRepository = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AddressesModule],
    })
      .overrideProvider(getRepositoryToken(Address))
      .useValue(mockAddressesRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  it('/adresses/get (GET)', () => {
    return request(app.getHttpServer())
      .get('/addesses/get')
      .set('Cookie', [
        'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdHlsZGFAd3AucGwiLCJzdWIiOjE4LCJyb2xlcyI6InVzZXIiLCJpYXQiOjE2NTIxMTE3ODA2NzIsImV4cCI6MTY1MjExMjM4NTQ3Mn0.A0mCBKsz5moIBlkGdy18STOmq52FlNAE7QXKkTtlYkQ',
      ])
      .expect(200);
    //.expect(404)
    // .expect('Content-Type', /json/)
  });
});
