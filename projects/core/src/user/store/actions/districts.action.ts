import { Action } from '@ngrx/store';
import { District } from '../../../model/address.model';
import { StateLoaderActions } from '../../../state/utils/index';
import { DISTRICTS } from '../user-state';

export const LOAD_DISTRICTS = '[User] Load Districts';
export const LOAD_DISTRICTS_SUCCESS = '[User] Load Districts Success';
export const LOAD_DISTRICTS_FAIL = '[User] Load Districts Fail';
export const CLEAR_DISTRICTS = '[User] Clear Districts';

export class LoadDistricts extends StateLoaderActions.LoaderLoadAction {
  readonly type = LOAD_DISTRICTS;
  constructor(public payload: string) {
    super(DISTRICTS);
  }
}

export class LoadDistrictsFail extends StateLoaderActions.LoaderFailAction {
  readonly type = LOAD_DISTRICTS_FAIL;
  constructor(public payload: any) {
    super(DISTRICTS, payload);
  }
}

export class LoadDistrictsSuccess extends StateLoaderActions.LoaderSuccessAction {
  readonly type = LOAD_DISTRICTS_SUCCESS;
  constructor(public payload: { entities: District[]; city: string }) {
    super(DISTRICTS);
  }
}

export class ClearDistricts implements Action {
  readonly type = CLEAR_DISTRICTS;
  constructor() {}
}

export type DistrictsAction =
  | LoadDistricts
  | LoadDistrictsFail
  | LoadDistrictsSuccess
  | ClearDistricts;
