import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Length(4, 60)
  country: string;

  @Column()
  @Length(1, 70)
  city: string;

  @Column()
  @Length(1, 70)
  street: string;

  @Column()
  @Length(1, 10)
  numberOfHouse: string;

  @Column()
  @Length(4, 15)
  zipCode: string;

  @Column({ default: new Date() })
  modifiedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
