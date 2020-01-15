import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
  CmsService,
  Page,
  PageBreadcrumbResolver,
  PageMetaResolver,
  PageTitleResolver,
} from '../../cms/index';
import { TranslationService } from '../../i18n';
import { PageType } from '../../model/cms.model';
import { ProductSearchPage } from '../../model/product-search.model';
import { RoutingService } from '../../routing/index';
import { ProductSearchService } from '../facade/product-search.service';

/**
 * Resolves the page data for the Search Result Page based on the
 * `PageType.CATEGORY_PAGE` and the `SearchResultsListPageTemplate` template.
 *
 * Only the page title is resolved in the implemenation.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  pageType = PageType.CONTENT_PAGE;
  pageTemplate = 'SearchResultsListPageTemplate';

  // reusable observable for search page data
  protected searchPage$: Observable<
    ProductSearchPage | Page
  > = this.cms.getCurrentPage().pipe(
    filter(Boolean),
    switchMap((page: Page) =>
      // only the existence of a plp component tells us if products
      // are rendered or if this is an ordinary content page
      this.hasProductListComponent(page)
        ? this.productSearchService.getResults().pipe(filter(Boolean))
        : of(page)
    )
  );

  total$: Observable<number> = this.productSearchService.getResults().pipe(
    filter(data => !!(data && data.pagination)),
    map(results => results.pagination.totalResults)
  );

  query$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map(state => state.state.params['query']));

  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super();
  }

  resolveTitle(): Observable<{ title: string } | any> {
    return combineLatest([this.total$, this.query$]).pipe(
      switchMap(([t, q]: [number, string]) =>
        this.translation.translate('pageMetaResolver.search.title', {
          count: t,
          query: q,
        })
      )
    );
  }

  private hasProductListComponent(page: Page): boolean {
    const has = !!Object.keys(page.slots).find(
      key =>
        !!page.slots[key].components.find(
          comp => comp.typeCode === 'SearchResultsListComponent'
        )
    );
    return has;
  }

  resolveBreadcrumbs(): Observable<any[]> {
    return combineLatest([
      this.searchPage$.pipe(),
      this.translation.translate('common.home'),
    ]).pipe(
      map(([p, label]: [ProductSearchPage, string]) =>
        p.breadcrumbs
          ? this.resolveBreadcrumbData(<ProductSearchPage>p, label)
          : null
      )
    );
  }

  protected resolveBreadcrumbData(
    page: ProductSearchPage,
    label: string
  ): any[] {
    const breadcrumbs = [];
    breadcrumbs.push({ label: label, link: '/' });
    if (page.breadcrumbs.length > 0) {
      breadcrumbs.push({
        label: `"${page.freeTextSearch}"`,
        link: this.routingService.getPath({
          cxRoute: 'search',
          params: { query: page.freeTextSearch },
        }),
      });
    }

    for (const br of page.breadcrumbs) {
      if (br.truncateQuery) {
        breadcrumbs.push({
          label: br.facetValueName,
          link: this.routingService.getPath({
            cxRoute: 'search',
            params: { query: page.freeTextSearch },
          }),
          queryParams: {
            query: decodeURIComponent(br.truncateQuery.query.value),
          },
        });
      }
    }

    for (const br of page.breadcrumbs) {
      if (!br.truncateQuery) {
        breadcrumbs.push({
          label: br.facetValueName,
        });
      }
    }

    return breadcrumbs;
  }

  // private filterPageData(page: ProductSearchPage) {
  //   return (
  //     !!page.pagination &&
  //     !!page.breadcrumbs &&
  //     !!this.getCategoryBreadcrumb(page.breadcrumbs)
  //   );
  // }

  // private getCategoryBreadcrumb(breadcrumbs: Breadcrumb[]): Breadcrumb {
  //   return breadcrumbs.find(
  //     br => br.facetCode === 'category' || br.facetCode === 'brand'
  //   );
  // }
}
