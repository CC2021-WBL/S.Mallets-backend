import { Utilization } from '../translations/types/translation-utilization.enum';

export const prepareTranslationKey = (
  entityUniqueName: string,
  utilization: Utilization,
) => {
  return `${entityUniqueName.toUpperCase()}_${utilization}`;
};

export const prepareTranslationDto = (
  key: string,
  translations: Record<string, string>,
) => {
  return { key: key, ...translations };
};
