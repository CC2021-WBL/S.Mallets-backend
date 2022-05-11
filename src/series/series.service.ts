import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSeriesDto } from './dto/create-series.dto';
import { Series } from './series.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  async createSeries(seriesData: CreateSeriesDto) {
    const prepairedSeries = await this.seriesRepository.create(seriesData);
    const addedSeries = await this.seriesRepository.save(prepairedSeries);
    if (addedSeries) {
      return addedSeries;
    } else {
      throw new HttpException('Invalid data', HttpStatus.PARTIAL_CONTENT);
    }
  }

  // async updateSeries() {}

  // async getSeries() {}

  // async deleteSeries() {}
}
