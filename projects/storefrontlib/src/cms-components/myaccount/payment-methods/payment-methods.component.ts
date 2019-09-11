import { Component, OnInit } from '@angular/core';
import {
  CheckoutPaymentService,
  FeatureConfigService,
  PaymentDetails,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Card } from '../../../shared/components/card/card.component';

@Component({
  selector: 'cx-payment-methods',
  templateUrl: './payment-methods.component.html',
})
export class PaymentMethodsComponent implements OnInit {
  paymentMethods$: Observable<PaymentDetails[]>;
  editCard: string;
  loading$: Observable<boolean>;

  constructor(
    userPaymentService: UserPaymentService,
    translation: TranslationService,
    checkoutPaymentService: CheckoutPaymentService,
    featureConfigService: FeatureConfigService
  );
  /**
   * @deprecated since version 1.2
   * Use constructor(userPaymentService: UserPaymentService,
   * translation: TranslationService,
   * checkoutPaymentService: CheckoutPaymentService,
   * featureConfigService: FeatureConfigService) instead
   *
   *  TODO(issue:#4309) Deprecated since 1.2.0
   */
  constructor(
    userPaymentService: UserPaymentService,
    translation: TranslationService
  );

  constructor(
    private userPaymentService: UserPaymentService,
    private translation: TranslationService,
    private checkoutPaymentService?: CheckoutPaymentService,
    private featureConfigService?: FeatureConfigService
  ) {}

  ngOnInit(): void {
    this.paymentMethods$ = this.userPaymentService.getPaymentMethods().pipe(
      tap(paymentDetails => {
        // Set first payment method to DEFAULT if none is set
        if (
          paymentDetails.length > 0 &&
          !paymentDetails.find(paymentDetail => paymentDetail.defaultPayment)
        ) {
          this.setDefaultPaymentMethod(paymentDetails[0]);
        }
      })
    );

    this.editCard = null;
    this.loading$ = this.userPaymentService.getPaymentMethodsLoading();
    this.userPaymentService.loadPaymentMethods();
  }

  getCardContent({
    defaultPayment,
    accountHolderName,
    expiryMonth,
    expiryYear,
    cardNumber,
  }: PaymentDetails): Observable<Card> {
    return combineLatest([
      this.translation.translate('paymentCard.setAsDefault'),
      this.translation.translate('common.delete'),
      this.translation.translate('paymentCard.deleteConfirmation'),
      this.translation.translate('paymentCard.expires', {
        month: expiryMonth,
        year: expiryYear,
      }),
      this.translation.translate('paymentCard.defaultPaymentMethod'),
    ]).pipe(
      map(
        ([
          textSetAsDefault,
          textDelete,
          textDeleteConfirmation,
          textExpires,
          textDefaultPaymentMethod,
        ]) => {
          const actions: { name: string; event: string }[] = [];
          if (!defaultPayment) {
            actions.push({ name: textSetAsDefault, event: 'default' });
          }
          actions.push({ name: textDelete, event: 'edit' });
          const card: Card = {
            header: defaultPayment ? textDefaultPaymentMethod : null,
            textBold: accountHolderName,
            text: [cardNumber, textExpires],
            actions,
            deleteMsg: textDeleteConfirmation,
          };

          return card;
        }
      )
    );
  }

  deletePaymentMethod(paymentMethod: PaymentDetails): void {
    this.userPaymentService.deletePaymentMethod(paymentMethod.id);
    this.editCard = null;
    /**
     * TODO(issue:#4309) Deprecated since 1.2.0
     */
    if (
      this.featureConfigService &&
      this.featureConfigService.isLevel('1.2') &&
      this.checkoutPaymentService
    ) {
      this.checkoutPaymentService.clearCheckoutPaymentMethod();
    }
  }

  setEdit(paymentMethod: PaymentDetails): void {
    this.editCard = paymentMethod.id;
  }

  cancelCard(): void {
    this.editCard = null;
  }

  setDefaultPaymentMethod(paymentMethod: PaymentDetails): void {
    this.userPaymentService.setPaymentMethodAsDefault(paymentMethod.id);
    /**
     * TODO(issue:#4309) Deprecated since 1.2.0
     */
    if (
      this.featureConfigService &&
      this.featureConfigService.isLevel('1.2') &&
      this.checkoutPaymentService
    ) {
      this.checkoutPaymentService.clearCheckoutPaymentMethod();
    }
  }
}
