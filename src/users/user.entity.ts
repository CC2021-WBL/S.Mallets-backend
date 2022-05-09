import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsInt, IsPositive, Length } from 'class-validator';

import { Address } from '../addresses/address.entity';
import { Role } from '../auth/types/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

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

  @Column({ type: 'enum', enum: Role, default: [Role.User] })
  roles?: Role[];

  @OneToOne(() => Address)
  @JoinColumn({ name: 'addressId' })
  address?: Address;

  // @Column({ nullable: true })
  // addressId?: number;

  @Column()
  hash: string;

  @Column({ default: new Date() })
  modifiedAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;
}
