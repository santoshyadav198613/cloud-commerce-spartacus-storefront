import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig } from 'projects/core/src/cms/config/cms-config';
import { ConfigModule } from 'projects/core/src/config/config.module';
import { TaxinvoiceComponent } from '../taxinvoice/taxinvoice.component';

@NgModule({
  declarations: [TaxinvoiceComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutTaxinvoice: {
          component: TaxinvoiceComponent,
        },
      },
    }),
  ],
  entryComponents: [TaxinvoiceComponent],
  exports: [TaxinvoiceComponent],
})
export class TaxinvoiceModule {}
