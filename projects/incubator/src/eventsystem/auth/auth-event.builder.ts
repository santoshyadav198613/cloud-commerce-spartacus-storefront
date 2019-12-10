import { Injectable } from '@angular/core';
import { Action, ActionsSubject } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthEventBuilder {
  constructor(protected actionsSubject: ActionsSubject) {}

  buildLoginEvent(): Observable<boolean> {
    return this.create([AuthActions.LOGIN]).pipe(
      mapTo(true),
      distinctUntilChanged()
    );
  }

  private create(actionTypes: string[]): Observable<any> {
    return this.actions(actionTypes);
  }

  private actions(actions: string[]): Observable<Action> {
    return this.actionsSubject.pipe(
      filter(data => actions.includes(data.type))
    );
  }
}
