import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateSeriesDto } from './dto/create-series.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Role } from '../auth/types/role.enum';
import { Roles } from '../decorators/roles.decorators';
import { RolesGuard } from './../auth/guards/roles.guards';
import { SeriesService } from './series.service';
import { TranslationsService } from '../translations/translations.service';
import { Utilization } from '../translations/types/translation-utilization.enum';
import { prepareSeries } from './../utils/prepareSeries';
import { prepareTranslationDto } from './../utils/prepareTranslationDto';

@Controller('series')
export class SeriesController {
  constructor(
    private readonly seriesService: SeriesService,
    private readonly translationsService: TranslationsService,
  ) {}
  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createSeries(@Body() seriesData: CreateSeriesDto) {
    const descriptionData = prepareTranslationDto(
      seriesData.seriesName,
      Utilization.Description,
      seriesData.seriesDescription,
    );
    const description = await this.translationsService.addTranslation(
      descriptionData,
    );
    const altTextData = prepareTranslationDto(
      seriesData.seriesName,
      Utilization.AltText,
      seriesData.seriesAltText,
    );
    const altText = await this.translationsService.addTranslation(altTextData);
    const readySeries = prepareSeries(seriesData, description, altText);
    const createdSeries = this.seriesService.createSeries(readySeries);
    return createdSeries;
  }
}
