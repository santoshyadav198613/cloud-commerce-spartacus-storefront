import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from 'projects/core/src/auth/guards/auth.guard';
import { CmsConfig } from 'projects/core/src/cms/config/cms-config';
import { ConfigModule } from 'projects/core/src/config/config.module';
import { I18nModule } from 'projects/core/src/i18n/i18n.module';
import { CartNotEmptyGuard } from 'projects/storefrontlib/src/cms-components/cart/cart-not-empty.guard';
import { ShippingAddressSetGuard } from '../../guards/shipping-address-set.guard';
import { TaxinvoiceComponent } from './taxinvoice.component';

@NgModule({
  declarations: [TaxinvoiceComponent],
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutTaxinvoice: {
          component: TaxinvoiceComponent,
          guards: [AuthGuard, CartNotEmptyGuard, ShippingAddressSetGuard],
        },
      },
    }),
  ],
  entryComponents: [TaxinvoiceComponent],
  exports: [TaxinvoiceComponent],
})
export class TaxinvoiceModule {}
