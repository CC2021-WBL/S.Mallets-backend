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

type HeadDiameterTypes = Range<30, 50>;
type StickLengthTypes = 35 | 35.5 | 36 | 36.5 | 37 | 37.5 | 38 | 38.5 | 39;
type WeightTypes = Range<29, 38>;

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
  quantity: Range<1, 100>;

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
