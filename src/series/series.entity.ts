import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBase64, IsString } from 'class-validator';

import { Product } from './../products/product.entity';
import { Translation } from '../translations/translation.entity';

@Entity('series')
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  seriesName: string;

  @OneToOne(() => Translation)
  @JoinColumn()
  seriesDescription: Translation;

  @Column({
    type: 'text',
  })
  @IsBase64()
  seriesImage: string;

  @OneToOne(() => Translation)
  @JoinColumn()
  seriesAltText: Translation;

  @OneToMany(() => Product, (product) => product.seriesId)
  products: Product[];

  @Column({ default: new Date() })
  modifiedAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;
}
