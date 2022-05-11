import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Series } from './series.entity';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { Translation } from '../translations/translation.entity';
import { TranslationsService } from '../translations/translations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Series, Translation])],
  controllers: [SeriesController],
  providers: [SeriesService, TranslationsService],
})
export class SeriesModule {}
