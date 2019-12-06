import { NgModule } from '@angular/core';
import { AuthEventService } from './auth-event.service';

@NgModule()
export class AuthEventModule {
  // simply add the AuthEventService to the module constructor so
  // it gets initialized when added
  constructor(_authEventService: AuthEventService) {}
}
