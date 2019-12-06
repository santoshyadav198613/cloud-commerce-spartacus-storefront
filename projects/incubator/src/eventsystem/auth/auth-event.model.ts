import { CxStateEvent } from '../events/event.model';

/**
 * Indicates that a user has logged in.
 * A boolean value is emited whenever the login event occurs.
 */
export class LoginEvent extends CxStateEvent<boolean> {}
