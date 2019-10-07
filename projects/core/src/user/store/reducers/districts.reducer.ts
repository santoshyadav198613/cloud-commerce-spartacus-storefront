import { Region } from '../../../model/address.model';
import { UserActions } from '../actions/index';
import { DistrictsState } from '../user-state';

export const initialState: DistrictsState = {
  entities: [],
  city: null,
};

export function reducer(
  state = initialState,
  action: UserActions.DistrictsAction | UserActions.ClearUserMiscsData
): DistrictsState {
  switch (action.type) {
    case UserActions.LOAD_DISTRICTS_SUCCESS: {
      const entities: Region[] = action.payload.entities;
      const city: string = action.payload.city;
      if (entities || city) {
        return {
          ...state,
          entities,
          city,
        };
      }
      return initialState;
    }
  }

  return state;
}
