import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { StateLoaderActions } from '../../../state/utils/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserActions } from '../actions/index';
import { CITIES } from '../user-state';

@Injectable()
export class CitiesEffects {
  @Effect()
  loadCities$: Observable<UserActions.CitiesAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_CITIES),
    map((action: UserActions.LoadCities) => {
      return action.payload;
    }),
    switchMap((regionCode: string) => {
      return this.siteConnector.getCities(regionCode).pipe(
        map(
          regions =>
            new UserActions.LoadCitiesSuccess({
              entities: regions,
              region: regionCode,
            })
        ),
        catchError(error =>
          of(new UserActions.LoadCitiesFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  @Effect()
  resetCities$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.CLEAR_USER_MISCS_DATA, UserActions.CLEAR_CITIES),
    map(() => {
      return new StateLoaderActions.LoaderResetAction(CITIES);
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
