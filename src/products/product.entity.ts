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

import { OrderDetails } from '../order-details/order-details.entity';
import { Series } from '../series/series.entity';
import { Translation } from '../translations/translation.entity';

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
    type: 'simple-array',
    default: [],
  })
  productImages: string[];

  @OneToOne(() => Translation)
  @JoinColumn()
  productAltText: Translation;

  @ManyToOne(() => Series, (series) => series.products)
  series: Series;

  @Column()
  seriesName: string;

  @UpdateDateColumn()
  modifiedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
