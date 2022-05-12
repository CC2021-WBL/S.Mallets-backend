import { Product } from 'src/products/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from '../order/order.entity';
import { Range } from '../utils/range';

@Entity()
export class OrderDetails {
  // COLUMNS IN ALL ENTITIES

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'modified_at',
  })
  modifiedAt!: Date;

  // COLUMNS IN THIS ENTITY

  @Column({
    type: 'smallint',
  })
  quantity: Range<1, 100>;

  // RELATIONS OF THIS ENTITY

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order!: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  product!: Product;
}
