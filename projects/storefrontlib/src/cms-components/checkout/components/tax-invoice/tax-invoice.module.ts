import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxInvoiceComponent } from './tax-invoice.component';
import { ConfigModule, CmsConfig, AuthGuard } from '@spartacus/core';
import { ShippingAddressSetGuard } from '../../guards/shipping-address-set.guard';
import { CartNotEmptyGuard } from './../../../../cms-components/cart/cart-not-empty.guard';
import { DeliveryModeSetGuard } from '../../guards/delivery-mode-set.guard';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutTaxInvoice: {
          selector: 'cx-tax-invoice',
          guards: [
            AuthGuard,
            CartNotEmptyGuard,
            ShippingAddressSetGuard,
            DeliveryModeSetGuard,
          ],
        },
      },
    }),
  ],
  declarations: [TaxInvoiceComponent],
  exports: [TaxInvoiceComponent],
  entryComponents: [TaxInvoiceComponent],
})
export class TaxInvoiceModule { }
