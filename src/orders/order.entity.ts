import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNumberString, Length } from 'class-validator';

import { Delivery } from '../delivery/delivery.entity';
import { OrderDetails } from '../order-details/order-details.entity';
import { OrderStatusTypes } from './dto/create-order.dto';
import { User } from '../users/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'order_status',
    type: 'enum',
    enum: OrderStatusTypes,
    default: OrderStatusTypes.WAITING_FOR_PAYMENT,
  })
  orderStatus!: string;

  @Column({
    name: 'final_cost_euro',
    type: 'numeric',
    default: 0,
  })
  finalCostEuro: number;

  @Column({ nullable: true, name: 'message_from_user' })
  messageFromUser?: string;

  @Column()
  @Length(2, 50)
  name: string;

  @Column()
  @Length(2, 50)
  lastname: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsNumberString()
  @Length(7, 20)
  phoneNumber: string;

  @Column()
  @Length(4, 60)
  country: string;

  @Column()
  @Length(1, 70)
  city: string;

  @Column()
  @Length(1, 10)
  streetAndNumber: string;

  @Column()
  @Length(4, 15)
  zipCode: string;

  @ManyToOne(() => Delivery)
  delivery!: Delivery;

  @ManyToOne(() => User, (user) => user.orders)
  user?: User;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails?: OrderDetails[];

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
