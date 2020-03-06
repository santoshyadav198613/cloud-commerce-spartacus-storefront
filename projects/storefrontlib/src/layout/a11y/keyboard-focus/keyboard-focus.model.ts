/** The element attribute used to store the focus state */
export const FOCUS_ATTR = 'data-cx-focus';
/** The element attribute used to store the focus group state */
export const FOCUS_GROUP_ATTR = 'data-cx-focus-group';

export const enum MOVE_FOCUS {
  NEXT = 1,
  PREV = -1,
}

export interface PersistFocusConfig {
  /**
   * A key to maintain the focus of an element in case the component is
   * recreated (which often is the case when an `*ngIf` or `*ngFor` is used).
   */
  key?: string;

  /**
   * Optional group identifier that can be used to persist the focus. This allows
   * to have separate persisted focus available when the DOM is partially rebuild.
   */
  group?: string;
}

export interface AutoFocusConfig extends PersistFocusConfig {
  /**
   * Autofocus is enabled by default, and will try to focus an _autofocus_ element.
   * In case the focus is explicitly set to `true`, the first accessible element
   * is focussed in case there is no _autofocus_ element found.
   * If the focus is set to false, autofocus will be disabled completely.
   *
   * If a string value is given, the autofocus will be restored based on the persisted
   * focus group, which is driven by `PersistFocusConfig.key` and `PersistFocusConfig.group`.
   *
   * Defaults to `true`.
   */
  autofocus?: boolean | string;

  // whenever the target autofocus element is selected by the `skipFocus` selector,
  // autofocus is ignored.
  skipFocus?: string;
}

export interface EscapeFocusConfig extends AutoFocusConfig {
  focusOnEscape?: boolean;
  /**
   * Force an autofocus in case of double-escape
   */
  focusOnDoubleEscape?: boolean;
}

export interface TabFocusConfig extends AutoFocusConfig {
  tab?: boolean | 'scroll';

  // selector
  childs?: string;
}

/**
 * The keyboard navigation (tab, shift-tab and up down keys) is _trapped_
 * for the nested focusable elements. This means that the focus can not
 * "leave" the elements. If the last element is focused, the keyboard will
 * navigate to the first element and visa versa.
 */
export interface TrapFocusConfig extends EscapeFocusConfig {
  /** traps the focus */
  trap?: boolean | 'start' | 'end';
}

export interface LockFocusConfig extends TrapFocusConfig {
  /**
   * Indicates that the nested DOM is locked for keyboarding (`TAB`)
   * you can conventiently add a group in the `lock` property, to avoid
   * boilerplate configuation.
   *
   * `<div [cxLockFocus]="{lock:'a'}"></div>`
   *
   * Using the `lock` property as a group works similar as provifing an
   * explicit `group`:
   *
   *
   * `<div [cxLockFocus]="{lock:true, group:'a'}"></div>`
   */
  lock?: boolean; // we used to have string as well...
}

// tslint:disable-next-line: no-empty-interface
export interface FocusConfig extends LockFocusConfig {}
