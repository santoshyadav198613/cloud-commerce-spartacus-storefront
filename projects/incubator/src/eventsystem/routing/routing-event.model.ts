import { CxStateEvent } from '../events/event.model';

/**
 * Indicates that a user visited a PDP page.
 * A visited product code value is emited whenever the PDP page is visited.
 */
export class ProductDetailsPageVisitedEvent extends CxStateEvent<string> {}

/**
 * Indicates that a user visited a category page.
 * A visited category code value is emited whenever the category page is visited.
 */
export class CategoryPageVisitedEvent extends CxStateEvent<string> {}
