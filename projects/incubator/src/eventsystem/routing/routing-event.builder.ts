import { Injectable } from '@angular/core';
import { PageContext, PageType, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const BRANDS_CATEGORY = 'brands';

@Injectable({
  providedIn: 'root',
})
export class RoutingEventBuilder {
  constructor(protected routingService: RoutingService) {}

  buildProductDetailsPageVisitEvent(): Observable<string> {
    return this.routerEvents(PageType.PRODUCT_PAGE).pipe(
      map(context => context.id)
    );
  }

  buildCategoryPageVisitEvent(): Observable<string> {
    return this.routerEvents(PageType.CATEGORY_PAGE).pipe(
      map(context => context.id),
      filter(id => id !== BRANDS_CATEGORY)
    );
  }

  private routerEvents(pageType: PageType): Observable<PageContext> {
    return this.routingService
      .getPageContext()
      .pipe(filter(context => context.type === pageType));
  }
}
