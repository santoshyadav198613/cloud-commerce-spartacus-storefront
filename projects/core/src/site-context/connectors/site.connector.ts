import { Injectable } from '@angular/core';
import { SiteAdapter } from './site.adapter';
import { Observable } from 'rxjs';
import { Currency, Language, BaseSite } from '../../model/misc.model';
import { Country, CountryType, Region, City, District } from '../../model/address.model';

@Injectable({
  providedIn: 'root',
})
export class SiteConnector {
  constructor(protected adapter: SiteAdapter) {}

  getLanguages(): Observable<Language[]> {
    return this.adapter.loadLanguages();
  }

  getCurrencies(): Observable<Currency[]> {
    return this.adapter.loadCurrencies();
  }

  getCountries(type?: CountryType): Observable<Country[]> {
    return this.adapter.loadCountries(type);
  }

  getRegions(countryIsoCode: string): Observable<Region[]> {
    return this.adapter.loadRegions(countryIsoCode);
  }

  getBaseSite(): Observable<BaseSite> {
    return this.adapter.loadBaseSite();
  }

  getCities(regionsIsoCode: string): Observable<City[]> {
    return this.adapter.loadCities(regionsIsoCode);
  }

  getDistricts(cityIsoCode: string): Observable<District[]> {
    return this.adapter.loadDistricts(cityIsoCode);
  }
}
