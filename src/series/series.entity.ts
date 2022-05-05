import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBase64, IsString } from 'class-validator';

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

  @Column({ default: new Date() })
  modifiedAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;
}
