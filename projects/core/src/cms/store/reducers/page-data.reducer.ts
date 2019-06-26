import { EntityState } from '../../../state/utils/entity/entity-state';
import { Page } from '../../model/page.model';
import * as fromAction from '../actions';

export const initialState: EntityState<Page> = { entities: {} };

export function reducer(
  state = initialState,
  action: fromAction.LoadPageDataSuccess
): EntityState<Page> {
  switch (action.type) {
    case fromAction.LOAD_PAGE_DATA_SUCCESS: {
      const page: Page = action.payload;
      return { ...state, entities: { ...state.entities, [page.pageId]: page } };
    }
  }
  return state;
}
