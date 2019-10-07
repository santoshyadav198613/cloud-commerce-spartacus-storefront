import { Action } from '@ngrx/store';
import { City } from '../../../model/address.model';
import { StateLoaderActions } from '../../../state/utils/index';
import { CITIES } from '../user-state';

export const LOAD_CITIES = '[User] Load Cities';
export const LOAD_CITIES_SUCCESS = '[User] Load Cities Success';
export const LOAD_CITIES_FAIL = '[User] Load Cities Fail';
export const CLEAR_CITIES = '[User] Clear Cities';

export class LoadCities extends StateLoaderActions.LoaderLoadAction {
  readonly type = LOAD_CITIES;
  constructor(public payload: string) {
    super(CITIES);
  }
}

export class LoadCitiesFail extends StateLoaderActions.LoaderFailAction {
  readonly type = LOAD_CITIES_FAIL;
  constructor(public payload: any) {
    super(CITIES, payload);
  }
}

export class LoadCitiesSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = LOAD_CITIES_SUCCESS;
  constructor(public payload: { entities: City[]; region: string }) {
    super(CITIES);
  }
}

export class ClearCities implements Action {
  readonly type = CLEAR_CITIES;
  constructor() {}
}

export type CitiesAction =
  | LoadCities
  | LoadCitiesFail
  | LoadCitiesSuccess
  | ClearCities;
