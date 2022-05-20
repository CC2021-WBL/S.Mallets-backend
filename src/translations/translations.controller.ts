import { UpdateTranslationDto } from './dto/update-translations.dto';
import { CreateTranslationDto } from './dto/create-translations.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '../auth/types/role.enum';
import { Roles } from '../decorators/roles.decorators';

import { TranslationsService } from './translations.service';
import { RolesGuard } from '../auth/guards/roles.guards';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addTranslation(@Body() translationData: CreateTranslationDto) {
    const translation = await this.translationsService.addTranslation(
      translationData,
    );
    return translation;
  }

  @Patch(':key')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateTranslation(
    @Param('key') key: string,
    @Body() translationData: UpdateTranslationDto,
  ) {
    const updatedTranslation = await this.translationsService.updateTranslation(
      key,
      translationData,
    );
    return updatedTranslation;
  }

  @Get(':key')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getTranslation(@Param('key') key: string) {
    const translation = await this.translationsService.getTranslation(key);
    return translation;
  }

  @Delete(':key')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteTranslation(@Param('key') key: string) {
    const deletedTranslation = await this.translationsService.getTranslation(
      key,
    );
    return deletedTranslation;
  }
}
