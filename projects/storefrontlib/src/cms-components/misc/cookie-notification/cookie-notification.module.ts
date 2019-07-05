import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CookieNotificationComponent } from './cookie-notification.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CookieNotificationComponent: {
          component: CookieNotificationComponent,
        },
      },
    }),
  ],
  declarations: [CookieNotificationComponent],
  exports: [CookieNotificationComponent],
  entryComponents: [CookieNotificationComponent],
})
export class CookieNotificationModule {}
