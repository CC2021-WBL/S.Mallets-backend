import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsInt, IsPositive, Length } from 'class-validator';

import { Address } from '../addresses/address.entity';
import { Role } from '../auth/types/role.enum';
import { Order } from '../order/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Length(2, 50)
  name: string;

  @Column()
  @Length(2, 50)
  surname: string;

  @Column()
  @IsInt()
  @IsPositive()
  phoneNumber: number;

  @Column('simple-array', { array: true, default: [Role.User] })
  roles: Role[];

  @OneToOne(() => Address)
  @JoinColumn()
  address?: Address;

  @OneToMany(() => Order, (order) => order.delivery)
  orders: Order[];

  @Column()
  hash: string;

  @UpdateDateColumn()
  modifiedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
