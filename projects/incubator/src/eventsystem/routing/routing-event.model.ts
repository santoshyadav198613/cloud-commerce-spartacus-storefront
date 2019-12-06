import { CxStateEvent } from '../events/event.model';

/**
 * Indicates that a user visited a PDP page.
 * A visited product code value is emited whenever the PDP page is visited.
 */
export class ProductDetailsPageVisitedEvent extends CxStateEvent<string> {}
