import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBase64, IsNumber, IsString } from 'class-validator';

import { Series } from '../series/series.entity';
import { Translation } from '../translations/translation.entity';
import { OrderDetails } from '../order-details/order-details.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  productModel: string;

  @OneToOne(() => Translation)
  @JoinColumn()
  productDescription: Translation;

  @Column({
    type: 'float',
  })
  @IsNumber()
  price: number;

  @Column({
    type: 'float',
  })
  @IsNumber()
  headDiameter: number;

  @Column({
    type: 'float',
  })
  @IsNumber()
  stickLength: number;

  @Column({
    type: 'float',
  })
  @IsNumber()
  weight: number;

  @Column({
    type: 'text',
  })
  @IsBase64()
  productImage: string;

  @OneToOne(() => Translation)
  @JoinColumn()
  productAltText: Translation;

  @ManyToOne(() => Series, (series) => series.products)
  series: Series;

  @UpdateDateColumn()
  modifiedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
  orderDetails?: OrderDetails[];
}
