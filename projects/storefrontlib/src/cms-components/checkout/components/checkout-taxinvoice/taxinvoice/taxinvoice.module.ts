import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxinvoiceComponent } from '../taxinvoice/taxinvoice.component';
import { ConfigModule } from 'projects/core/src/config/config.module';
import { CmsConfig } from 'projects/core/src/cms/config/cms-config';

@NgModule({
  declarations: [TaxinvoiceComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutShippingAddress: {
          component: TaxinvoiceComponent,
        },
      },
    }),
  ],
entryComponents: [TaxinvoiceComponent],
exports: [TaxinvoiceComponent],
})
export class TaxinvoiceModule { }
