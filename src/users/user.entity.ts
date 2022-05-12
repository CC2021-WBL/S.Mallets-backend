import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Address } from './../addresses/address.entity';
import { Role } from '../auth/types/role.enum';
import { Order } from '../order/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phoneNumber: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  roles?: Role[];

  @OneToMany(() => Address, (address) => address.user)
  addresses?: Address[];

  @OneToMany(() => Order, (order) => order.delivery)
  orders: Order[];

  @Column()
  hash: string;

  @Column({ default: new Date() })
  modifiedAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;
}
