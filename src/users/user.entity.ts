import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNumberString, Length } from 'class-validator';

import { Address } from '../addresses/address.entity';
import { Order } from '../orders/order.entity';
import { Role } from '../auth/types/role.enum';

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
  lastname: string;

  @Column()
  @IsNumberString()
  @Length(7, 20)
  phoneNumber: string;

  @Column('simple-array', { array: true, default: [Role.User] })
  roles: Role[];

  @OneToOne(() => Address)
  @JoinColumn()
  address?: Address;

  @OneToMany(() => Order, (order) => order.user)
  @Column('simple-array', { array: true, default: [] })
  orders: Order[];

  @Column()
  hash: string;

  @UpdateDateColumn()
  modifiedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
