import { Injectable } from '@angular/core';
import { PageContext, PageType, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoutingEventBuilder {
  constructor(protected routingService: RoutingService) {}

  buildProductDetailsPageEvent(): Observable<string> {
    return this.routerEvents(PageType.PRODUCT_PAGE).pipe(
      map(context => context.id),
      distinctUntilChanged()
    );
  }

  private routerEvents(pageType: PageType): Observable<PageContext> {
    return this.routingService
      .getPageContext()
      .pipe(filter(context => context.type === pageType));
  }
}
