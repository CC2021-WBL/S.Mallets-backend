import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsString } from 'class-validator';

@Entity('translations')
export class Translation {
  @PrimaryColumn({ unique: true })
  @IsString()
  key: string;

  @Column({
    type: 'text',
  })
  @IsString()
  pl: string;

  @Column({
    type: 'text',
  })
  @IsString()
  en: string;
}
