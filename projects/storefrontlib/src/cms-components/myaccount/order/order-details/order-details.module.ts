import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { CardModule } from '../../../../shared/components/card/card.module';
import { CartSharedModule } from '../../../cart/cart-shared/cart-shared.module';
import { BannerComponent } from '../../../content';
import { OrderDetailHeadlineComponent } from './order-detail-headline/order-detail-headline.component';
import { OrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { OrderDetailShippingComponent } from './order-detail-shipping/order-detail-shipping.component';
import { OrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';
import { OrderDetailsService } from './order-details.service';

const moduleComponents = [
  OrderDetailHeadlineComponent,
  OrderDetailItemsComponent,
  OrderDetailTotalsComponent,
  OrderDetailShippingComponent,
];

@NgModule({
  imports: [
    CartSharedModule,
    CardModule,
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderDetailsHeadlineComponent: {
          component: OrderDetailHeadlineComponent,
          childRoutes: [{ path: ':orderCode', component: BannerComponent }],
        },
        AccountOrderDetailsItemsComponent: {
          component: OrderDetailItemsComponent,
        },
        AccountOrderDetailsTotalsComponent: {
          component: OrderDetailTotalsComponent,
        },
        AccountOrderDetailsShippingComponent: {
          component: OrderDetailShippingComponent,
        },
      },
    }),
  ],
  providers: [OrderDetailsService],
  declarations: [...moduleComponents],
  exports: [...moduleComponents],
  entryComponents: [...moduleComponents],
})
export class OrderDetailsModule {}
