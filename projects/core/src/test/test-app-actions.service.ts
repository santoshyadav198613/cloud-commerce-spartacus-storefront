import { Injectable } from '@angular/core';
import { WindowRef } from '../window';
import { AuthService } from '../auth/facade/auth.service';
import { RoutingService } from '../routing/facade/routing.service';

@Injectable({
  providedIn: 'root'
})
export class TestAppActionsService {
  constructor(
    protected winRef: WindowRef,
    protected authService: AuthService,
    protected routingService: RoutingService,
  ) {
  }

  init() {
    console.log('yay, works')
    if (this.winRef.nativeWindow) {
      // this.winRef.nativeWindow['spartacus'] = {
      //   authorizeWithToken: (token) => {
      //     console.log(token)
      //     this.authService.authorizeWithToken(JSON.parse(token));
      //   },
      //   authorize: (username, password) => {
      //     this.authService.authorize(username, password);
      //   },
      //   navigate: (param) => {
      //     this.routingService.go(JSON.parse(param))
      //   }
      // }
    }
  }

}
