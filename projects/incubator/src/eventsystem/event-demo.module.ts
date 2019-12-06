import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ComponentFactory,
  ComponentFactoryResolver,
  NgModule,
} from '@angular/core';
import { OutletPosition, OutletService } from '@spartacus/storefront';
import { AuthEventModule } from './auth/auth-event.module';
import { CartEventModule } from './cart/cart-event.module';
import { CmsEventModule } from './cms/cms-event.module';
import { EventDemoComponent } from './event-demo.component';
import { UiEventModule } from './ui/index';

/**
 * Demonstrate the usage of the new event system. By adding this module, we're
 * adding serveral event modules to Spartacus, as well as the `EventDemoComponent`.
 */
@NgModule({
  imports: [
    CommonModule,
    UiEventModule,
    CartEventModule,
    CmsEventModule,
    AuthEventModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: incubatorEventFactory,
      deps: [ComponentFactoryResolver, OutletService],
      multi: true,
    },
  ],
  declarations: [EventDemoComponent],
  entryComponents: [EventDemoComponent],
})
export class EventDemoModule {}

export function incubatorEventFactory(
  componentFactoryResolver: ComponentFactoryResolver,
  outletService: OutletService<ComponentFactory<any>>
) {
  const isReady = () => {
    const factory = componentFactoryResolver.resolveComponentFactory(
      EventDemoComponent
    );
    outletService.add('cx-storefront', factory, OutletPosition.BEFORE);
  };
  return isReady;
}
