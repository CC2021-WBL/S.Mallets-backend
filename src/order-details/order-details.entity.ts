import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from 'src/products/product.entity';

import { Order } from '../orders/order.entity';
import { Ranges } from '../utils/ranges';

@Entity('order_details')
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // RELATIONS OF THIS ENTITY

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order?: Order;

  @ManyToOne(() => Product)
  product!: Product;

  // COLUMNS IN THIS ENTITY

  @Column({
    type: 'smallint',
  })
  quantity: Ranges<1, 50>;

  @Column({
    name: 'head_diameter',
    type: 'float',
  })
  headDiameter: number;
  // headDiameter: HeadDiameterTypes;

  @Column({
    name: 'stick_length',
    type: 'float',
  })
  stickLength: number;
  // stickLength: StickLengthTypes;

  @Column({
    type: 'float',
  })
  weight: number;
  // weight: WeightTypes;

  // TIMESTAMPS

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'modified_at',
  })
  modifiedAt!: Date;
}
