import { enableProdMode, ApplicationRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AuthService, RoutingService } from '@spartacus/core';
// import { AuthService } from '@spartacus/core';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule).then((module: any) => {
    const applicationRef = module.injector.get(ApplicationRef);
    applicationRef.isStable.subscribe(stable => {
      let set = false;
      if(stable && !set) {
        set = true;
        window['spartacus'] = {
          authorizeWithToken: (token) => {
            console.log(token)
            module.injector.get(AuthService).authorizeWithToken(JSON.parse(token));
          },
          authorize: (username, password) => {
            module.injector.get(AuthService).authorize(username, password);
          },
          navigate: (param) => {
            console.log('wtf');
            module.injector.get(RoutingService).go(JSON.parse(param))
          }
        }
      }
    })
  });
});
