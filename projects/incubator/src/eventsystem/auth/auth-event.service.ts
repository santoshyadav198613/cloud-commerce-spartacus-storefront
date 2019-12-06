import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter } from '../events/event.emitter';
import { AuthEventBuilder } from './auth-event.builder';
import { LoginEvent } from './auth-event.model';

@Injectable({
  providedIn: 'root',
})
export class AuthEventService {
  constructor(
    protected eventEmitter: EventEmitter,
    protected builder: AuthEventBuilder
  ) {
    // helper function to attach event sources to the event type
    const attach = <T>(eventType: Type<T>, value$: Observable<any>) =>
      this.eventEmitter.attach(
        eventType,
        value$.pipe(map(state => <any>{ state }))
      );

    attach(LoginEvent, builder.buildLoginEvent());
  }
}
