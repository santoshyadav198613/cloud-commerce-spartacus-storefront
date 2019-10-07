import { City } from '../../../model/address.model';
import { UserActions } from '../actions/index';
import { CitiesState } from '../user-state';

export const initialState: CitiesState = {
  entities: [],
  region: null,
};

export function reducer(
  state = initialState,
  action: UserActions.CitiesAction | UserActions.ClearUserMiscsData
): CitiesState {
  switch (action.type) {
    case UserActions.LOAD_CITIES_SUCCESS: {
      const entities: City[] = action.payload.entities;
      const region: string = action.payload.region;
      if (entities || region) {
        return {
          ...state,
          entities,
          region,
        };
      }
      return initialState;
    }
  }

  return state;
}
