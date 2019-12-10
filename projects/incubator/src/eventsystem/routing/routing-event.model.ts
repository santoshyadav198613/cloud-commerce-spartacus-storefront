import { Breadcrumb } from '@spartacus/core';
import { CxStateEvent } from '../events/event.model';

/**
 * Indicates that a user visited a PDP page.
 * A visited product code value is emited whenever the PDP page is visited.
 */
export class ProductDetailsPageVisitedEvent extends CxStateEvent<string> {}
/**
 * Indicates that a user visited a category or brand page.
 * A visited category / brand code value is emited whenever one of the pages is visited.
 */
export class CategoryPageVisitedEvent extends CxStateEvent<string> {}
/**
 * Indicates that a user changed category-related facets.
 * All the category facet values are emited whenever the user changes them.
 * The event is emitted only when the user is on the facet-supported page - category, brand and search results page.
 */
export class CategoryFacetChangeEvent extends CxStateEvent<Breadcrumb[]> {}
/**
 * Indicates that a user changed brand-related facets.
 * All the brand facet values are emited whenever the user changes them.
 * The event is emitted only when the user is on the facet-supported page - category, brand and search results page.
 */
export class BrandFacetChangeEvent extends CxStateEvent<Breadcrumb[]> {}
