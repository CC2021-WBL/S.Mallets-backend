import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBase64, IsNumber, IsString } from 'class-validator';

import { Series } from './../series/series.entity';
import { Translation } from '../translations/translation.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  productName: string;

  @OneToOne(() => Translation)
  @JoinColumn()
  productDescription: Translation;

  @Column()
  @IsNumber()
  price: number;

  @Column()
  @IsNumber()
  headDiameter: number;

  @Column()
  @IsNumber()
  stickLength: number;

  @Column()
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
  seriesId: Series;

  @Column()
  modifiedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
