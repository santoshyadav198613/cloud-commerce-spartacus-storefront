import { Observable } from 'rxjs';
import { Currency, Language, BaseSite } from '../../model/misc.model';
import { Country, CountryType, Region, City, District } from '../../model/address.model';

export abstract class SiteAdapter {
  /**
   * Abstract method used to load languages.
   */
  abstract loadLanguages(): Observable<Language[]>;

  /**
   * Abstract method used to load currencies.
   */
  abstract loadCurrencies(): Observable<Currency[]>;

  /**
   * Abstract method used to get countries with optional type.
   */
  abstract loadCountries(type?: CountryType): Observable<Country[]>;

  /**
   * Abstract method used to get regions for a country.
   */
  abstract loadRegions(countryIsoCode: string): Observable<Region[]>;

  /**
   * Abstract method used to get base site data.
   */
  abstract loadBaseSite(): Observable<BaseSite>;

  /**
   * Abstract method used to get cities for a region.
   */
  abstract loadCities(regionsIsoCode: string): Observable<City[]>;

  /**
   * Abstract method used to get districts for a city.
   */
  abstract loadDistricts(cityIsoCode: string): Observable<District[]>;
}
