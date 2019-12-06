import { NgModule } from '@angular/core';
import { RoutingEventService } from './routing-event.service';

@NgModule()
export class RoutingEventModule {
  // simply add the RoutingEventService to the module constructor so
  // it gets initialized when added
  constructor(_routingEventService: RoutingEventService) {}
}
