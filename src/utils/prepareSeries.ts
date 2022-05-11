import { CreateSeriesDto } from '../series/dto/create-series.dto';
import { Translation } from './../translations/translation.entity';

export const prepareSeries = (
  seriesData: CreateSeriesDto,
  description: Translation,
  altText: Translation,
): CreateSeriesDto => {
  const seriesObj = {
    seriesName: seriesData.seriesName,
    seriesDescription: description,
    seriesImage: seriesData.seriesImage,
    seriesAltText: altText,
  };
  return seriesObj;
};
