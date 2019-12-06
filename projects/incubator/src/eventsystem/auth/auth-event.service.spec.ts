import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EventEmitter } from '../events/event.emitter';
import { AuthEventBuilder } from './auth-event.builder';
import { AuthEventService } from './auth-event.service';

class MockEventEmitter {
  attach() {}
}

class MockAuthEventBuilder {
  buildLoginEvent() {
    return of('LOGIN');
  }
}

describe('CartEventService', () => {
  let eventEmitter: EventEmitter;
  let authEventBuilder: AuthEventBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthEventService,
        {
          provide: EventEmitter,
          useClass: MockEventEmitter,
        },
        {
          provide: AuthEventBuilder,
          useClass: MockAuthEventBuilder,
        },
      ],
    });

    eventEmitter = TestBed.get(EventEmitter);
    authEventBuilder = TestBed.get(AuthEventBuilder);

    spyOn(eventEmitter, 'attach').and.callThrough();
    spyOn(authEventBuilder, 'buildLoginEvent').and.callThrough();
  });

  it('should inject service', () => {
    const service = TestBed.get(AuthEventService);
    expect(service).toBeTruthy();
  });

  it('should attach events', () => {
    TestBed.get(AuthEventService);

    expect(eventEmitter.attach).toHaveBeenCalledTimes(1);
    expect(authEventBuilder.buildLoginEvent).toHaveBeenCalled();
  });
});
