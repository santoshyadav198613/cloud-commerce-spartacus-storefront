import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import { AuthActions } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { AuthEventBuilder } from './auth-event.builder';

describe('AuthEventBuilder', () => {
  let service: AuthEventBuilder;
  let actionsSubject: BehaviorSubject<Action>;

  beforeEach(() => {
    actionsSubject = new BehaviorSubject<Action>(new AuthActions.Login());

    TestBed.configureTestingModule({
      providers: [
        AuthEventBuilder,
        {
          provide: ActionsSubject,
          useValue: actionsSubject,
        },
      ],
    });

    service = TestBed.get(AuthEventBuilder as Type<AuthEventBuilder>);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('buildLoginEvent', () => {
    it('should emit when the AuthActions.LOGIN is dispatched', () => {
      let result = false;
      service
        .buildLoginEvent()
        .subscribe(value => (result = value))
        .unsubscribe();
      expect(result).toEqual(true);
    });
  });
});
