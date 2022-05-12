import { Address } from 'src/addresses/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Delivery } from '../delivery/delivery.entity';
import { User } from '../users/user.entity';

export enum OrderStatusTypes {
  WAITING_FOR_PAYMENT = 'Waiting for payment',
  PROCESSING_TIME = 'Processing time',
  READY_FOR_SHIPMENT = 'Ready for shipment',
  DELIVERY_IN_PROGRESS = 'Delivery in progress',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @ManyToOne(() => Delivery, (delivery) => delivery.orders)
  delivery: Delivery;

  @ManyToOne(() => Address, (address) => address.orders)
  address: Address;

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

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'modified_at',
  })
  modifiedAt!: Date;
}
