import { createSelector, MemoizedSelector } from '@ngrx/store';
import { District } from '../../../model/address.model';
import { StateLoaderSelectors } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { DistrictsState, StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getDistrictsLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<DistrictsState>
> = createSelector(
  getUserState,
  (state: UserState) => state.districts
);


export const getDistrictsDataAndLoading: MemoizedSelector<
  StateWithUser,
  {
    loaded: boolean;
    loading: boolean;
    districts: District[];
    city: string;
  }
> = createSelector(
  getDistrictsLoaderState,
  (state: LoaderState<DistrictsState>) => ({
    loaded: StateLoaderSelectors.loaderSuccessSelector(state),
    loading: StateLoaderSelectors.loaderLoadingSelector(state),
    districts: StateLoaderSelectors.loaderValueSelector(state).entities,
    city: StateLoaderSelectors.loaderValueSelector(state).city,
  })
);
