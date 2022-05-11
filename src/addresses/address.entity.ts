import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './../users/user.entity';
import { Order } from '../order/order.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  numberOfHouse: string;

  @Column()
  zipCode: string;

  @OneToMany(() => Order, (order) => order.delivery)
  orders: Order[];
}
