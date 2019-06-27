import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '@spartacus/core';
import { CheckoutConfigService } from '../../checkout-config.service';

@Component({
  selector: 'cx-taxinvoice',
  templateUrl: './taxinvoice.component.html',
  styleUrls: ['./taxinvoice.component.css'],
})
export class TaxinvoiceComponent implements OnInit {
  private checkoutStepUrlNext: string;
  private checkoutStepUrlPrevious: string;
  constructor(
    private routingService: RoutingService,
    private checkoutConfigService: CheckoutConfigService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlPrevious = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
  }

  goNext(): void {
    this.routingService.go(this.checkoutStepUrlNext);
  }

  back(): void {
    this.routingService.go(this.checkoutStepUrlPrevious);
  }
}
