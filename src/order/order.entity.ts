import { Address } from 'src/addresses/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Delivery } from '../delivery/delivery.entity';
import { User } from '../users/user.entity';
import { OrderDetails } from '../order-details/order-details.entity';
import { OrderStatusTypes } from "./dto/create-order.dto";

@Entity('order')
export class Order {
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
    name: 'order_status',
    type: 'enum',
    enum: OrderStatusTypes,
  })
  orderStatus: string;

  @Column({
    name: 'final_cost_euro',
    type: 'numeric',
  })
  finalCostEuro: number;

  @Column({ name: 'message_from_user' })
  messageFromUser: string;

  // RELATIONS OF THIS ENTITY

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Delivery, (delivery) => delivery.orders)
  delivery: Delivery;

  @ManyToOne(() => Address, (address) => address.orders)
  address: Address;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails?: OrderDetails[];
}
