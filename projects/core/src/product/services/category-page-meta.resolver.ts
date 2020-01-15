import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import {
  CmsService,
  Page,
  PageBreadcrumbResolver,
  PageMetaResolver,
  PageTitleResolver,
} from '../../cms/index';
import { TranslationService } from '../../i18n/index';
import { PageType } from '../../model/cms.model';
import {
  Breadcrumb,
  ProductSearchPage,
} from '../../model/product-search.model';
import { RoutingService } from '../../routing/index';
import { ProductSearchService } from '../facade/product-search.service';

/**
 * Resolves the page data for the Product Listing Page
 * based on the `PageType.CATEGORY_PAGE`.
 *
 * The page title, and breadcrumbs are resolved in this implementation only.
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageBreadcrumbResolver {
  pageType = PageType.CATEGORY_PAGE;

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

  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected cms: CmsService,
    protected translation: TranslationService
  ) {
    super();
  }

  resolveTitle(): Observable<string> {
    return this.searchPage$.pipe(
      filter(page => this.filterPageData(page as ProductSearchPage)),
      switchMap((p: ProductSearchPage) => {
        return this.translation.translate('pageMetaResolver.category.title', {
          count: (<ProductSearchPage>p).pagination.totalResults,
          query: this.getCategoryBreadcrumb(p.breadcrumbs).facetValueName,
        });
      })
    );
  }

  resolveBreadcrumbs(): Observable<any[]> {
    return combineLatest([
      this.searchPage$.pipe(),
      this.translation.translate('common.home'),
    ]).pipe(
      tap(console.log),
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
    const categoryCode = this.getCategoryCode(page);

    for (const br of page.breadcrumbs) {
      if (br.truncateQuery) {
        const queryParams =
          (br.facetCode === 'category' || br.facetCode === 'brand') &&
          br.facetValueCode === categoryCode
            ? {}
            : { query: decodeURIComponent(br.truncateQuery.query.value) };
        breadcrumbs.push({
          label: br.facetValueName,
          link: this.routingService.getPath({
            cxRoute: 'category',
            params: { code: categoryCode },
          }),
          queryParams,
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

  private getCategoryCode(page: ProductSearchPage): string {
    const catFacet = page.breadcrumbs.find(
      br => br.facetCode === 'category' || br.facetCode === 'brand'
    );
    return catFacet ? catFacet.facetValueCode : null;
  }

  private hasProductListComponent(page: Page): boolean {
    const has = !!Object.keys(page.slots).find(
      key =>
        !!page.slots[key].components.find(
          comp =>
            comp.typeCode === 'CMSProductListComponent' ||
            comp.typeCode === 'ProductGridComponent'
        )
    );
    return has;
  }

  private filterPageData(page: ProductSearchPage) {
    return (
      !!page.pagination &&
      !!page.breadcrumbs &&
      !!this.getCategoryBreadcrumb(page.breadcrumbs)
    );
  }

  private getCategoryBreadcrumb(breadcrumbs: Breadcrumb[]): Breadcrumb {
    return breadcrumbs.find(
      br => br.facetCode === 'category' || br.facetCode === 'brand'
    );
  }
}
