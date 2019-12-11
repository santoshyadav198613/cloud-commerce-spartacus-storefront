import { Breadcrumb } from '@spartacus/core';
import { StateEvent } from '../events/event.model';

/**
 * Indicates that a user visited a PDP page.
 * A visited product code value is emited whenever the PDP page is visited.
 */
export class ProductDetailsPageVisitedEvent extends StateEvent<string> {}
/**
 * Indicates that a user visited a category or brand page.
 * A visited category / brand code value is emited whenever one of the pages is visited.
 */
export class CategoryPageVisitedEvent extends StateEvent<string> {}
/**
 * Indicates that a user changed category-related facets.
 * All the category facet values are emited whenever the user changes them.
 * The event is emitted only when the user is on the facet-supported page - category, brand and search results page.
 */
export class CategoryFacetChangeEvent extends StateEvent<Breadcrumb[]> {}
/**
 * Indicates that a user changed brand-related facets.
 * All the brand facet values are emited whenever the user changes them.
 * The event is emitted only when the user is on the facet-supported page - category, brand and search results page.
 */
export class BrandFacetChangeEvent extends StateEvent<Breadcrumb[]> {}
