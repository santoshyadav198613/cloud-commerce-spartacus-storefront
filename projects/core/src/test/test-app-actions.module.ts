import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TestAppActionsService } from './test-app-actions.service';
import { AuthModule } from '../auth/auth.module';
import { RoutingModule } from '../routing/routing.module';

export function testAppActionsFactory(testAppActionsService: TestAppActionsService): any {
  const result = () => {testAppActionsService.init()};
  return result;
}

/**
 * Designed/intended to make integration/e2e testing easier.
 *
 * CAUTION: DON'T USE IT IN PRODUCTION!
 */
@NgModule({
  imports: [AuthModule, RoutingModule],
  providers: [
    TestAppActionsService,
    {
      provide: APP_INITIALIZER,
      useFactory: testAppActionsFactory,
      deps: [TestAppActionsService],
      multi: true,
    },
  ],
})
export class TestAppActionsModule {}
