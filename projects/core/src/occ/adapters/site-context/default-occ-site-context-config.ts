import { OccConfig } from '../../config/occ-config';

export const defaultOccSiteContextConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        languages: 'languages',
        currencies: 'currencies',
        countries: 'countries',
        regions:
          'countries/${isoCode}/regions?fields=regions(name,isocode,isocodeShort)',
        cities: 'regions/${regionId}/cities',
        districts: 'cities/${cityId}/districts',
      },
    },
  },
};
