import { SeriesService } from './../series/series.service';
import { prepareEntityWithTranslation } from '../utils/prepareEntitiesWithTranslation';
import { prepareTranslationDto } from '../utils/prepareTranslationDto';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { Utilization } from '../translations/types/translation-utilization.enum';
import { Translation } from '../translations/translation.entity';
import { Product } from '../products/product.entity';
import { Series } from '../series/series.entity';

@Injectable()
export class ProductTranslationContract {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly seriesService: SeriesService,
  ) {}
  async createProduct(productData: CreateProductDto, seriesId: number) {
    const series = await this.seriesService.getOneSeriesWithProducts(seriesId);
    if (!series) {
      throw new HttpException(
        'You want to add product to not existed series',
        HttpStatus.NOT_FOUND,
      );
    }
    const descriptionData = prepareTranslationDto(
      productData.productModel,
      Utilization.Description,
      productData.productDescription,
    );
    const altTextData = prepareTranslationDto(
      productData.productModel,
      Utilization.AltText,
      productData.productAltText,
    );
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const prepairedDescription = queryRunner.manager.create(
        Translation,
        descriptionData,
      );
      const prepairedAltText = queryRunner.manager.create(
        Translation,
        altTextData,
      );
      const [description, altText] = await queryRunner.manager.save([
        prepairedDescription,
        prepairedAltText,
      ]);
      const productToDB = prepareEntityWithTranslation(productData, {
        productDescription: description,
        productAltText: altText,
      });
      const prepairedProduct = queryRunner.manager.create(Product, productToDB);
      prepairedProduct.series = series;
      const [addedProduct] = await queryRunner.manager.save([prepairedProduct]);
      await queryRunner.manager
        .createQueryBuilder()
        .relation(Series, 'products')
        .of(series)
        .add(addedProduct);

      await queryRunner.commitTransaction();
      return addedProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
