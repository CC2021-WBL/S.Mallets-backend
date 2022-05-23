import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '../addresses/address.entity';
import { Product } from './../products/product.entity';
import { Series } from '../series/series.entity';
import { Translation } from './../translations/translation.entity';
import { User } from './../users/user.entity';
import { Delivery } from 'src/delivery/delivery.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST_NAME'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME_OF_DATABASE'),
        autoLoadEntities: true,
        entities: [User, Address, Translation, Series, Product, Delivery],
        synchronize: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
