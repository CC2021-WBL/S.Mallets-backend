import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  deliveryName!: string;

  @Column()
  deliveryArea!: string;

  @Column({ type: 'decimal' })
  deliveryPrice: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  modifiedAt!: Date;
}
