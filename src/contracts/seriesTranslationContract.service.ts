import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeriesTranslationContract {
  constructor(private readonly connection: Connection) {}
}
