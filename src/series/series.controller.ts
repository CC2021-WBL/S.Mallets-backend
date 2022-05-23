import { SeriesTranslationContract } from './../contracts/seriesTranslationContract.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateSeriesDto } from './dto/create-series.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Role } from '../auth/types/role.enum';
import { Roles } from '../decorators/roles.decorators';
import { RolesGuard } from './../auth/guards/roles.guards';
import { SeriesService } from './series.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('series')
@Controller('series')
export class SeriesController {
  constructor(
    private readonly seriesService: SeriesService,
    private readonly seriesTranslationContract: SeriesTranslationContract,
  ) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createSeries(@Body() seriesData: CreateSeriesDto) {
    const createdSeries = await this.seriesTranslationContract.createSeries(
      seriesData,
    );
    return createdSeries;
  }

  @Get('/all')
  async getAllSeries() {
    const allSeries = await this.seriesService.getAllSeries();
    return allSeries;
  }

  @Get('/all/with-products')
  async getAllSeriesWithProducts() {
    const allSeries = await this.seriesService.getAllSeriesWithProducts();
    return allSeries;
  }

  @Get(':seriesId')
  async getOneSeries(@Param('seriesId', ParseIntPipe) seriesId: number) {
    const series = await this.seriesService.getOneSeries(seriesId);
    return series;
  }

  @Get('/with-products/:seriesId')
  async getOneSeriesWitProducts(
    @Param('seriesId', ParseIntPipe) seriesId: number,
  ) {
    const series = await this.seriesService.getOneSeriesWithProducts(seriesId);
    return series;
  }
}
