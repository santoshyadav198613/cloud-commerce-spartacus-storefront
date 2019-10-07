import { createSelector, MemoizedSelector } from '@ngrx/store';
import { City } from '../../../model/address.model';
import { StateLoaderSelectors } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { CitiesState, StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getCitiesLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<CitiesState>
> = createSelector(
  getUserState,
  (state: UserState) => state.cities
);


export const getCitiesDataAndLoading: MemoizedSelector<
  StateWithUser,
  {
    loaded: boolean;
    loading: boolean;
    cities: City[];
    region: string;
  }
> = createSelector(
  getCitiesLoaderState,
  (state: LoaderState<CitiesState>) => ({
    loaded: StateLoaderSelectors.loaderSuccessSelector(state),
    loading: StateLoaderSelectors.loaderLoadingSelector(state),
    cities: StateLoaderSelectors.loaderValueSelector(state).entities,
    region: StateLoaderSelectors.loaderValueSelector(state).region,
  })
);
