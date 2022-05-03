import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Address } from './../addresses/address.entity';
import { Role } from '../auth/types/role.enum';

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
  role?: Role;

  @OneToMany(() => Address, (address) => address.user)
  addresses?: Address[];

  @Column()
  hash: string;

  @Column()
  salt: string;

  @Column({ default: new Date() })
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
