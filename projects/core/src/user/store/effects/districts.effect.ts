import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SiteConnector } from '../../../site-context/connectors/site.connector';
import { StateLoaderActions } from '../../../state/utils/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { UserActions } from '../actions/index';
import { DISTRICTS } from '../user-state';

@Injectable()
export class DistrictsEffects {
  @Effect()
  loadDistricts$: Observable<UserActions.DistrictsAction> = this.actions$.pipe(
    ofType(UserActions.LOAD_DISTRICTS),
    map((action: UserActions.LoadDistricts) => {
      return action.payload;
    }),
    switchMap((cityCode: string) => {
      return this.siteConnector.getDistricts(cityCode).pipe(
        map(
          regions =>
            new UserActions.LoadDistrictsSuccess({
              entities: regions,
              city: cityCode,
            })
        ),
        catchError(error =>
          of(new UserActions.LoadDistrictsFail(makeErrorSerializable(error)))
        )
      );
    })
  );

  @Effect()
  resetDistricts$: Observable<Action> = this.actions$.pipe(
    ofType(UserActions.CLEAR_USER_MISCS_DATA, UserActions.CLEAR_DISTRICTS),
    map(() => {
      return new StateLoaderActions.LoaderResetAction(DISTRICTS);
    })
  );

  constructor(
    private actions$: Actions,
    private siteConnector: SiteConnector
  ) {}
}
