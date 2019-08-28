import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config, provideConfig } from '../config';
import { defaultScrollConfig } from './config/default-scroll-config';
import { ViewConfig } from './config/view-config';

@NgModule({})
export class ViewConfigModule {
  static forRoot(): ModuleWithProviders<ViewConfigModule> {
    return {
      ngModule: ViewConfigModule,
      providers: [
        provideConfig(defaultScrollConfig),
        {
          provide: ViewConfig,
          useExisting: Config,
        },
      ],
    };
  }
}
