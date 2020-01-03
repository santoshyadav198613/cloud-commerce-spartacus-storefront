export interface LoadingScopeConfig {
  /**
   * Specify scopes that should be included with this scope
   */
  include?: string[];
  /**
   * Max age for the scope in seconds
   */
  maxAge?: number;
}

// tslint:disable-next-line:no-empty-interface
export interface LoadingScopes {
  // [model: string]: LoadingScopesConfig;
}
