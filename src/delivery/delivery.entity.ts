import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'delivery_name',
  })
  deliveryName!: string;

  @Column({
    name: 'delivery_area',
  })
  deliveryArea!: string;

  @Column({
    name: 'delivery_price_euro',
    type: 'decimal',
  })
  deliveryPriceEuro: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'modified_at',
  })
  modifiedAt!: Date;

  @OneToMany(() => Order, (order) => order.delivery)
  orders: Order[];
}
