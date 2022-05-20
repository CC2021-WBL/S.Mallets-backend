import { CreateTranslationDto } from './../translations/dto/create-translations.dto';
import { UpdateTranslationDto } from './../translations/dto/update-translations.dto';
import { Utilization } from '../translations/types/translation-utilization.enum';

export const prepareTranslationDto = (
  entityUniqueName: string,
  utilization: Utilization,
  translations: UpdateTranslationDto,
): CreateTranslationDto => {
  const key = `${entityUniqueName.toUpperCase()}_${utilization}`;
  return { key: key, ...translations };
};
