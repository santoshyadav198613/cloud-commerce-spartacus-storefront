import { InjectionToken } from '@angular/core';
import { Converter } from '../../util/converter.service';
import { Currency, Language } from '../../model/misc.model';
import { Country, Region, City, District } from '../../model/address.model';

export const LANGUAGE_NORMALIZER = new InjectionToken<Converter<any, Language>>(
  'LanguageNormalizer'
);

export const CURRENCY_NORMALIZER = new InjectionToken<Converter<any, Currency>>(
  'CurrencyNormalizer'
);

export const COUNTRY_NORMALIZER = new InjectionToken<Converter<any, Country>>(
  'CountryNormalizer'
);

export const REGION_NORMALIZER = new InjectionToken<Converter<any, Region>>(
  'RegionNormalizer'
);

export const CITY_NORMALIZER = new InjectionToken<Converter<any, City>>(
  'CityNormalizer'
);

export const DISTRICT_NORMALIZER = new InjectionToken<Converter<any, District>>(
  'DistrictNormalizer'
);
