import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Cart, OccEndpointsService, OrderEntry } from '@spartacus/core';
import { of, ReplaySubject, Subject } from 'rxjs';
import {
  CartChangedPushEvent,
  ConsentChangedPushEvent,
  NavigatedPushEvent,
} from '../model/profile-tag.model';
import { ProfileTagInjector } from './profile-tag.injector';
import { ProfileTagEventTracker } from './profiletag-events';
import { SpartacusEventTracker } from './spartacus-events';

describe('ProfileTagInjector', () => {
  let httpMock: HttpClient;
  let postBehaviour: Subject<boolean>;
  let occEndpointsService: OccEndpointsService;
  let occEndpointBehaviour: Subject<string>;
  let profileTagInjector: ProfileTagInjector;
  let addTrackerBehavior: Subject<Event>;
  let profileTagEventTrackerMock: ProfileTagEventTracker;
  let cartBehavior: Subject<{ entries: OrderEntry[]; cart: Cart }>;
  let consentBehavior: Subject<boolean>;
  let navigatedBehavior: Subject<boolean>;

  let spartacusEventTrackerMock: SpartacusEventTracker;
  function setVariables() {
    cartBehavior = new ReplaySubject<{ entries: OrderEntry[]; cart: Cart }>();
    consentBehavior = new ReplaySubject<boolean>();
    navigatedBehavior = new ReplaySubject<boolean>();
    addTrackerBehavior = new ReplaySubject<Event>();
    postBehaviour = new ReplaySubject<boolean>();
    occEndpointBehaviour = new ReplaySubject<string>();
    httpMock = <HttpClient>(<unknown>{
      post: jasmine.createSpy('post').and.callFake(_ => postBehaviour),
    });
    occEndpointsService = <OccEndpointsService>(<unknown>{
      getBaseEndpoint: jasmine
        .createSpy('getBaseEndpoint')
        .and.callFake(_ => occEndpointBehaviour),
    });
    spartacusEventTrackerMock = <SpartacusEventTracker>(<unknown>{
      consentGranted: jasmine
        .createSpy('consentGranted')
        .and.callFake(_ => consentBehavior),
      navigated: jasmine
        .createSpy('navigated')
        .and.callFake(_ => navigatedBehavior),
      cartChanged: jasmine
        .createSpy('cartChanged')
        .and.callFake(_ => cartBehavior),
      loginSuccessful: jasmine
        .createSpy('loginSuccessful')
        .and.callFake(_ => postBehaviour),
    });
    profileTagEventTrackerMock = <ProfileTagEventTracker>(<unknown>{
      addTracker: jasmine
        .createSpy('addTracker')
        .and.callFake(_ => addTrackerBehavior),
      notifyProfileTagOfEventOccurence: jasmine.createSpy(
        'notifyProfileTagOfEventOccurence'
      ),
      getProfileTagEvents: jasmine
        .createSpy('getProfileTagEvents')
        .and.callFake(_ => of()),
    });
  }
  beforeEach(() => {
    setVariables();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProfileTagEventTracker,
          useValue: profileTagEventTrackerMock,
        },
        {
          provide: SpartacusEventTracker,
          useValue: spartacusEventTrackerMock,
        },
        {
          provide: HttpClient,
          useValue: httpMock,
        },
        {
          provide: OccEndpointsService,
          useValue: occEndpointsService,
        },
      ],
    });
    profileTagInjector = TestBed.get(ProfileTagInjector as Type<
      ProfileTagInjector
    >);
  });

  it('Should be created', () => {
    expect(profileTagInjector).toBeTruthy();
    expect(spartacusEventTrackerMock).toBeTruthy();
  });

  it('Should notify profile tag of consent granted', () => {
    const subscription = profileTagInjector.track().subscribe();
    addTrackerBehavior.next(new CustomEvent('test'));
    consentBehavior.next(true);

    subscription.unsubscribe();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledTimes(1);

    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(new ConsentChangedPushEvent(true));
  });

  it('Should notify profile tag of cart change', () => {
    const subscription = profileTagInjector.track().subscribe();
    const cartEntry: OrderEntry[] = [{ entryNumber: 7 }];
    const testCart = <Cart>{ testCart: { id: 123 } };
    addTrackerBehavior.next(new CustomEvent('test'));
    cartBehavior.next({ entries: cartEntry, cart: testCart });

    subscription.unsubscribe();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalled();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(
      new CartChangedPushEvent({ entries: cartEntry, cart: testCart })
    );
  });

  it('Should notify profile tag of page loaded', () => {
    const subscription = profileTagInjector.track().subscribe();
    addTrackerBehavior.next(new CustomEvent('test'));
    navigatedBehavior.next(true);
    subscription.unsubscribe();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalled();
    expect(
      profileTagEventTrackerMock.notifyProfileTagOfEventOccurence
    ).toHaveBeenCalledWith(new NavigatedPushEvent());
  });

  it('Should notify profile tag of successful login', () => {
    const subscription = profileTagInjector.track().subscribe();
    addTrackerBehavior.next(new CustomEvent('test'));
    postBehaviour.next(true);
    occEndpointBehaviour.next('url');
    subscription.unsubscribe();
    expect(httpMock.post).toHaveBeenCalled();
    expect(occEndpointsService.getBaseEndpoint).toHaveBeenCalled();
  });
});
