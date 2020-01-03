import { ProductScope } from '../../../product/model/product-scope';
import { LoadingScopeConfig } from '../../config/loading-scopes-config';

// Improve type-safety and code completion for product loading scopes
declare module '../../config/loading-scopes-config' {
  interface LoadingScopes {
    product?: Partial<Record<ProductScope, ProductLoadingScopeConfig>>;
  }
}

export interface ProductLoadingScopeConfig extends LoadingScopeConfig {
  include?: (ProductScope)[];
}
