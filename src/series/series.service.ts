import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Series } from './series.entity';

@Injectable()
export class SeriesService {
  constructor(private seriesRepository: Repository<Series>) {}

  async createSeries() {}

  async updateSeries() {}

  async getSeries() {}

  async deleteSeries() {}
}
