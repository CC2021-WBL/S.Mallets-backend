import { prepareEntityWithTranslation } from '../utils/prepareEntitiesWithTranslation';
import { prepareTranslationDto } from '../utils/prepareTranslationDto';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ProductsService } from '../products/products.service';
import { TranslationsService } from '../translations/translations.service';
import { Utilization } from '../translations/types/translation-utilization.enum';
import { Translation } from '../translations/translation.entity';
import { Product } from '../products/product.entity';

// type CreateProductProps = {
//   description: CreateTranslationDto;
//   altText: CreateTranslationDto;
//   productData: CreateProductDto;
// };

@Injectable()
export class ProductTranslationContract {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly productService: ProductsService,
    private readonly translationsService: TranslationsService,
  ) {}
  async createProduct(productData: CreateProductDto) {
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
        productDesctiption: description,
        productAltText: altText,
      });
      console.log(productToDB);
      const prepairedProduct = queryRunner.manager.create(Product, productToDB);
      console.log(prepairedProduct);
      const [addedProduct] = await queryRunner.manager.save([prepairedProduct]);
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
