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
import {
  HeadDiameterTypes,
  Ranges,
  StickLengthTypes,
  WeightTypes,
} from '../utils/ranges';

@Entity('order_details')
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
  quantity: Ranges<1, 100>;

  @Column({
    name: 'head_diameter',
    type: 'smallint',
  })
  headDiameter: HeadDiameterTypes;

  @Column({
    name: 'stick_length',
    type: 'smallint',
  })
  stickLength: StickLengthTypes;

  @Column({
    type: 'smallint',
  })
  weight: WeightTypes;

  // RELATIONS OF THIS ENTITY

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order!: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  product!: Product;
}
