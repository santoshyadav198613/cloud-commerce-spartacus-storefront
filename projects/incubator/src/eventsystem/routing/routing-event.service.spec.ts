import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { EventEmitter } from '../events/event.emitter';
import { RoutingEventBuilder } from './routing-event.builder';
import { RoutingEventService } from './routing-event.service';

class MockEventEmitter {
  attach(): void {}
}

class MockRoutingEventBuilder {
  buildProductDetailsPageVisitEvent(): Observable<string> {
    return of('PDP page code: 300938');
  }
  buildCategoryPageVisitEvent(): Observable<string> {
    return of('category code: 577');
  }
}

describe('RoutingEventService', () => {
  let eventEmitter: EventEmitter;
  let routingEventBuilder: RoutingEventBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoutingEventService,
        {
          provide: EventEmitter,
          useClass: MockEventEmitter,
        },
        {
          provide: RoutingEventBuilder,
          useClass: MockRoutingEventBuilder,
        },
      ],
    });

    eventEmitter = TestBed.get(EventEmitter);
    routingEventBuilder = TestBed.get(RoutingEventBuilder);

    spyOn(eventEmitter, 'attach').and.callThrough();
    spyOn(
      routingEventBuilder,
      'buildProductDetailsPageVisitEvent'
    ).and.callThrough();
    spyOn(routingEventBuilder, 'buildCategoryPageVisitEvent').and.callThrough();
  });

  it('should inject service', () => {
    const service = TestBed.get(RoutingEventService);
    expect(service).toBeTruthy();
  });

  it('should attach events', () => {
    TestBed.get(RoutingEventService);

    expect(eventEmitter.attach).toHaveBeenCalledTimes(2);
    expect(
      routingEventBuilder.buildProductDetailsPageVisitEvent
    ).toHaveBeenCalled();
    expect(routingEventBuilder.buildCategoryPageVisitEvent).toHaveBeenCalled();
  });
});
