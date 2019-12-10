import { Component } from '@angular/core';
import { LoginEvent } from './auth/index';
import { CartAddEvent } from './cart/index';
import { PageLoadEvent } from './cms/index';
import { EventService } from './events/event.service';
import {
  BrandFacetChangeEvent,
  CategoryFacetChangeEvent,
  CategoryPageVisitedEvent,
  ProductDetailsPageVisitedEvent,
} from './routing/index';
import { ClickEvent } from './ui/index';

/**
 * This demo component adds a click event to the cx-storefront,
 * as well as subscribing to a couple of events.
 */
@Component({
  selector: 'cx-event-demo',
  template: `
    <div cxUiEvent="hover" cxUiEventTarget="grandparent"></div>
  `,
})
export class EventDemoComponent {
  constructor(eventService: EventService) {
    // dispatch any of these events using a single API
    eventService.get(ClickEvent, PageLoadEvent).subscribe(console.log);

    // dispatch events together with the main event (CartAddEvent)
    eventService
      .getCombined(CartAddEvent, PageLoadEvent, ClickEvent)
      .subscribe(console.log);

    eventService
      .get(LoginEvent)
      .subscribe(result =>
        console.log(
          'This should happen only when the user logs in. If the page refreshes, this should not be printed: ',
          result
        )
      );

    eventService
      .get(
        ProductDetailsPageVisitedEvent,
        CategoryPageVisitedEvent,
        CategoryFacetChangeEvent,
        BrandFacetChangeEvent
      )
      .subscribe(console.log);
  }
}
