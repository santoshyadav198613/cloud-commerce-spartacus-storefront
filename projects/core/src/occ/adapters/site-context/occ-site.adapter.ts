import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country, CountryType, Region, City, District } from '../../../model/address.model';
import { BaseSite, Currency, Language } from '../../../model/misc.model';
import {
  COUNTRY_NORMALIZER,
  CURRENCY_NORMALIZER,
  LANGUAGE_NORMALIZER,
  REGION_NORMALIZER,
  CITY_NORMALIZER,
  DISTRICT_NORMALIZER,
} from '../../../site-context/connectors/converters';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccSiteAdapter implements SiteAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  loadLanguages(): Observable<Language[]> {
    return this.http
      .get<Occ.LanguageList>(this.occEndpointsService.getUrl('languages'))
      .pipe(
        map(languageList => languageList.languages),
        this.converterService.pipeableMany(LANGUAGE_NORMALIZER)
      );
  }

  loadCurrencies(): Observable<Currency[]> {
    return this.http
      .get<Occ.CurrencyList>(this.occEndpointsService.getUrl('currencies'))
      .pipe(
        map(currencyList => currencyList.currencies),
        this.converterService.pipeableMany(CURRENCY_NORMALIZER)
      );
  }

  loadCountries(type?: CountryType): Observable<Country[]> {
    return this.http
      .get<Occ.CountryList>(
        this.occEndpointsService.getUrl(
          'countries',
          undefined,
          type ? { type } : undefined
        )
      )
      .pipe(
        map(countryList => countryList.countries),
        this.converterService.pipeableMany(COUNTRY_NORMALIZER)
      );
  }

  loadRegions(countryIsoCode: string): Observable<Region[]> {
    return this.http
      .get<Occ.RegionList>(
        this.occEndpointsService.getUrl('regions', { isoCode: countryIsoCode })
      )
      .pipe(
        map(regionList => regionList.regions),
        this.converterService.pipeableMany(REGION_NORMALIZER)
      );
  }

  loadBaseSite(): Observable<BaseSite> {
    const baseUrl = this.occEndpointsService.getBaseEndpoint();
    const urlSplits = baseUrl.split('/');
    const activeSite = urlSplits.pop();
    const url = urlSplits.join('/') + '/basesites';

    const params = new HttpParams({
      fromString: 'fields=FULL',
    });

    return this.http
      .get<{ baseSites: BaseSite[] }>(url, { params: params })
      .pipe(
        map(siteList => {
          return siteList.baseSites.find(site => site.uid === activeSite);
        })
      );
  }

  loadCities(regionsIsoCode: string): Observable<City[]> {
    const url = this.occEndpointsService.getUrl('cities', {regionId: regionsIsoCode});
    return this.http
      .get<{cities: City[]}>(url)
      .pipe(map(cityList=>cityList.cities),
      this.converterService.pipeableMany(CITY_NORMALIZER));
  }

  loadDistricts(cityIsoCode: string): Observable<District[]> {
    const url = this.occEndpointsService.getUrl('districts', {cityId: cityIsoCode});
    return this.http
      .get<{districts: District[]}>(url)
      .pipe(map(districtList=>districtList.districts),
      this.converterService.pipeableMany(DISTRICT_NORMALIZER));
  }
}
