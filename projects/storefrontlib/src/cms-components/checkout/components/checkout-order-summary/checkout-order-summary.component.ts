import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cart, CartService } from '@spartacus/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'cx-checkout-order-summary',
  templateUrl: './checkout-order-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutOrderSummaryComponent {
  cart$: Observable<Cart>;

  constructor(protected cartService: CartService) {
    this.cart$ = this.cartService.activeCart$;
  }
}
