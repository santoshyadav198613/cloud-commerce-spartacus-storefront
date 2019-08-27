import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { PageSlotModule } from '../../../cms-structure/page/slot/page-slot.module';
import {
  ItemCounterModule,
  ListNavigationModule,
  MediaModule,
  SpinnerModule,
  StarRatingModule,
} from '../../../shared/index';
import { AddToCartModule } from '../../cart/index';
import { PreviewModalComponent } from '../../content/preview/preview-modal.component';
import { IconModule } from '../../misc/icon/index';
import { ProductReferencesComponent } from '../carousel/product-references/product-references.component';
import { ProductListComponent } from './container/product-list.component';
import { ProductFacetNavigationComponent } from './product-facet-navigation/product-facet-navigation.component';
import { ProductGridItemComponent } from './product-grid-item/product-grid-item.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSProductListComponent: {
          component: ProductListComponent,
        },
        SearchResultsListComponent: {
          component: ProductListComponent,
        },
        ProductRefinementComponent: {
          component: ProductFacetNavigationComponent,
        },
        ProductReferencesComponent: {
          component: ProductReferencesComponent,
        },
      },
    }),
    RouterModule,
    MediaModule,
    AddToCartModule,
    ItemCounterModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    PageSlotModule,
    SpinnerModule,
    StarRatingModule,
    IconModule,
  ],
  declarations: [
    ProductListComponent,
    ProductFacetNavigationComponent,
    ProductListItemComponent,
    ProductGridItemComponent,
    PreviewModalComponent,
    ProductViewComponent,
  ],
  exports: [
    ProductListComponent,
    ProductFacetNavigationComponent,
    ProductListItemComponent,
    ProductGridItemComponent,
    PreviewModalComponent,
    ProductViewComponent,
  ],
  entryComponents: [
    ProductListComponent,
    ProductFacetNavigationComponent,
    PreviewModalComponent,
  ],
})
export class ProductListModule {}
