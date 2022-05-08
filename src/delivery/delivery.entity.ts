import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { length: 50 })
  deliveryName: string;

  @Column('varchar', { length: 50 })
  deliveryArea: string;

  @Column({ type: 'decimal' })
  deliveryPrice: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
