import { Connection } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateSeriesDto } from './../series/dto/create-series.dto';
import { Series } from '../series/series.entity';
import { Translation } from '../translations/translation.entity';
import { Utilization } from '../translations/types/translation-utilization.enum';
import { prepareEntityWithTranslation } from './../utils/prepareEntitiesWithTranslation';
import { prepareTranslationDto } from './../utils/prepareTranslationDto';

@Injectable()
export class SeriesTranslationContract {
  constructor(private readonly connection: Connection) {}
  async createSeries(seriesData: CreateSeriesDto) {
    const descriptionData = prepareTranslationDto(
      seriesData.seriesName,
      Utilization.Description,
      seriesData.seriesDescription,
    );
    const altTextData = prepareTranslationDto(
      seriesData.seriesName,
      Utilization.AltText,
      seriesData.seriesAltText,
    );
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const prepairedDescription = queryRunner.manager.create(
        Translation,
        descriptionData,
      );
      const prepairedAltText = queryRunner.manager.create(
        Translation,
        altTextData,
      );
      const [description, altText] = await queryRunner.manager.save([
        prepairedDescription,
        prepairedAltText,
      ]);
      const seriestoDB = prepareEntityWithTranslation(seriesData, {
        seriesDescription: description,
        seriesAltText: altText,
      });
      const prepairedSeries = queryRunner.manager.create(Series, seriestoDB);
      const [addedSeries] = await queryRunner.manager.save([prepairedSeries]);
      await queryRunner.commitTransaction();
      return addedSeries;
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
