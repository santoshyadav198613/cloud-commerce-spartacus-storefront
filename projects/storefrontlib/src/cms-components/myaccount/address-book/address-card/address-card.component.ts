import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  Address,
  CheckoutDeliveryService,
  FeatureConfigService,
  UserAddressService,
  LanguageService,
} from '@spartacus/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-address-card',
  templateUrl: './address-card.component.html',
})
export class AddressCardComponent implements OnInit {
  
  editMode: boolean;
  isDefault: boolean;
  isChineseAddressFormatingEnabled = false;

  @Input() address: Address;

  @Output() editEvent = new EventEmitter<any>();

  constructor(
    userAddressService: UserAddressService,
    checkoutDeliveryService: CheckoutDeliveryService,
    featureConfigService: FeatureConfigService,
    languageService: LanguageService,
  );
  /**
   * @deprecated since version 1.2
   *  Use constructor(userAddressService: UserAddressService,
   *  checkoutDeliveryService: CheckoutDeliveryService
   *  featureConfigService: FeatureConfigService) instead
   *
   *  TODO(issue:#4309) Deprecated since 1.2.0
   */
  constructor(userAddressService: UserAddressService);
  constructor(
    private userAddressService: UserAddressService,
    protected checkoutDeliveryService?: CheckoutDeliveryService,
    private featureConfigService?: FeatureConfigService,
    private languageService?: LanguageService,
  ) {}

  ngOnInit(): void {
    this.languageService.getActive().pipe(
      map(lang => lang && lang === 'zh' && this.isChineseAddressEnabled())
    ).subscribe(enabled => this.isChineseAddressFormatingEnabled = enabled);
  }

  openEditFormEvent(): void {
    this.editEvent.emit();
  }

  cancelEdit(): void {
    this.editMode = false;
  }

  setEditMode(): void {
    this.editMode = true;
  }

  setAddressAsDefault(addressId: string): void {
    this.userAddressService.setAddressAsDefault(addressId);
    /**
     * TODO(issue:#4309) Deprecated since 1.2.0
     */
    if (
      this.featureConfigService &&
      this.featureConfigService.isLevel('1.2') &&
      this.checkoutDeliveryService
    ) {
      this.checkoutDeliveryService.clearCheckoutDeliveryDetails();
    }
  }

  deleteAddress(addressId: string): void {
    this.userAddressService.deleteUserAddress(addressId);
    /**
     * TODO(issue:#4309) Deprecated since 1.2.0
     */
    if (
      this.featureConfigService &&
      this.featureConfigService.isLevel('1.2') &&
      this.checkoutDeliveryService
    ) {
      this.checkoutDeliveryService.clearCheckoutDeliveryDetails();
    }
  }

  private isChineseAddressEnabled(): boolean{
    return this.featureConfigService.isEnabled('chineseAddress');
  }
}
