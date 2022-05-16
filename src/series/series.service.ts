import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Series } from './series.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
  ) {}

  async getOneSeries(id: number) {
    const series = await this.seriesRepository
      .createQueryBuilder('series')
      .leftJoinAndSelect('series.seriesDescription', 'translations')
      .leftJoinAndSelect('series.seriesAltText', 'translation')
      .where('series.id = :id', { id: id })
      .getOne();
    if (series) {
      return series;
    }
    throw new HttpException('Not found series', HttpStatus.NOT_FOUND);
  }

  async getOneSeriesWithProducts(id: number) {
    const series = await this.seriesRepository
      .createQueryBuilder('series')
      .leftJoinAndSelect('series.seriesDescription', 'translations')
      .leftJoinAndSelect('series.seriesAltText', 'translation')
      .leftJoinAndSelect('series.products', 'products')
      .where('series.id = :id', { id: id })
      .getOne();
    if (series) {
      return series;
    }
    throw new HttpException('Not found series', HttpStatus.NOT_FOUND);
  }

  async getAllSeries() {
    const allSeries = await this.seriesRepository
      .createQueryBuilder('series')
      .leftJoinAndSelect('series.seriesDescription', 'translations')
      .leftJoinAndSelect('series.seriesAltText', 'translation')
      .getMany();
    if (allSeries) {
      return allSeries;
    }
    throw new HttpException('Not found series', HttpStatus.NOT_FOUND);
  }

  async getAllSeriesWithProducts() {
    const allSeries = await this.seriesRepository
      .createQueryBuilder('series')
      .leftJoinAndSelect('series.seriesDescription', 'translations')
      .leftJoinAndSelect('series.seriesAltText', 'translation')
      .leftJoinAndSelect('series.products', 'products')
      .getMany();
    if (allSeries) {
      return allSeries;
    }
    throw new HttpException('Not found series', HttpStatus.NOT_FOUND);
  }

  //TODO:
  // async updateSeries() {}

  // async deleteSeries() {}
}
