import { Component, OnInit } from '@angular/core';
import { Order, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrderDetailsService } from '../order-details.service';

@Component({
  selector: 'cx-order-details-headline',
  templateUrl: './order-detail-headline.component.html',
})
export class OrderDetailHeadlineComponent implements OnInit {
  constructor(
    private orderDetailsService: OrderDetailsService,
    private routing: RoutingService
  ) {}

  order$: Observable<Order>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();

    //spike working:
    this.routing
      .getRouterState()
      .pipe(take(1))
      .subscribe(routingData => {
        if (!routingData.state.params.orderCode) {
          this.routing.go({ cxRoute: 'orders' });
        }
      });
  }
}
