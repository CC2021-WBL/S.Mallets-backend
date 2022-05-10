import { CreateSeriesDto } from './dto/create-series.dto';
import { RolesGuard } from './../auth/guards/roles.guards';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Role } from '../auth/types/role.enum';
import { Roles } from '../decorators/roles.decorators';

import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {

    @Post()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async createSeries(@Body() seriesData: CreateSeriesDto) {
      
    }
  }
}
