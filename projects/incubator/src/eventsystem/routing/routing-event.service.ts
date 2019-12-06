import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter } from '../events/event.emitter';
import { RoutingEventBuilder } from './routing-event.builder';
import {
  CategoryPageVisitedEvent,
  ProductDetailsPageVisitedEvent,
} from './routing-event.model';

@Injectable({
  providedIn: 'root',
})
export class RoutingEventService {
  constructor(
    protected eventEmitter: EventEmitter,
    protected builder: RoutingEventBuilder
  ) {
    // helper function to attach event sources to the event type
    const attach = <T>(eventType: Type<T>, value$: Observable<any>) =>
      this.eventEmitter.attach(
        eventType,
        value$.pipe(map(state => <any>{ state }))
      );

    attach(
      ProductDetailsPageVisitedEvent,
      builder.buildProductDetailsPageVisitEvent()
    );
    attach(CategoryPageVisitedEvent, builder.buildCategoryPageVisitEvent());
  }
}
