import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @UpdateDateColumn()
  modifiedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
