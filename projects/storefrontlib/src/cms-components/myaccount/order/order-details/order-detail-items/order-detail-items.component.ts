import { Component, OnInit } from '@angular/core';
import { Consignment, Order, OrderEntry, CmsService, CmsAction } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-order-details-items',
  templateUrl: './order-detail-items.component.html',
})
export class OrderDetailItemsComponent implements OnInit {
  constructor(
    private orderDetailsService: OrderDetailsService,
    private cmsService: CmsService
    ) { }

  order$: Observable<Order>;


  actions$: Observable<CmsAction[]>;

  ngOnInit() {
    this.order$ = this.orderDetailsService.getOrderDetails();
    this.actions$ = this.cmsService.getComponentData('AccountOrderHistoryComponent').pipe(
      map(component => component.actions)
    )
  }

  openTrackingDialog(){
    
  }

  getConsignmentProducts(consignment: Consignment): OrderEntry[] {
    const products: OrderEntry[] = [];
    consignment.entries.forEach(element => {
      products.push(element.orderEntry);
    });

    return products;
  }

  
}
