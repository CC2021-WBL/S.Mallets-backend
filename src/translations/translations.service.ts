import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateTranslationDto } from './dto/create-translations.dto';
import { Translation } from './translation.entity';
import { UpdateTranslationDto } from './dto/update-translations.dto';

@Injectable()
export class TranslationsService {
  constructor(private translationRepository: Repository<Translation>) {}

  async addTranslation(translationData: CreateTranslationDto) {
    const prepairedTranslation = await this.translationRepository.create(
      translationData,
    );
    const addedTranslation = await this.translationRepository.save(
      prepairedTranslation,
    );
    if (addedTranslation) {
      return addedTranslation;
    }
    throw new HttpException('InvalidData', HttpStatus.PARTIAL_CONTENT);
  }

  async updateTranslation(key: string, translationData: UpdateTranslationDto) {
    const updatedTranslation = await this.translationRepository
      .createQueryBuilder()
      .update(Translation)
      .set(translationData)
      .where('key = :key', { key: key })
      .returning('*')
      .execute()
      .then((response) => {
        return response.raw[0];
      });

    if (updatedTranslation) {
      return updatedTranslation;
    }

    throw new HttpException('UpdatingFailed', HttpStatus.BAD_REQUEST);
  }

  async getTranslation(key: string) {
    const translation = await this.translationRepository
      .createQueryBuilder('user')
      .where('user.key = :key', { key: key })
      .getOne();

    if (translation) {
      return translation;
    }
    throw new HttpException('Translation not found', HttpStatus.NOT_FOUND);
  }

  async deleteTranslation(key: string) {
    const deletedTranslation = await this.translationRepository
      .createQueryBuilder()
      .delete()
      .where('key = :key', { key: key })
      .returning('*')
      .execute()
      .then((response) => {
        return response.raw[0];
      });

    if (deletedTranslation) {
      return deletedTranslation;
    }
    throw new HttpException(
      'Deletion failed',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
