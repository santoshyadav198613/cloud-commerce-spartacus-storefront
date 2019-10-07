import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import {
  Address,
  AddressValidation,
  CheckoutDeliveryService,
  Country,
  GlobalMessageService,
  GlobalMessageType,
  Region,
  Title,
  UserAddressService,
  UserService,
  City,
  District,
  FeatureConfigService,
} from '@spartacus/core';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';
import {
  ModalRef,
  ModalService,
} from '../../../../../shared/components/modal/index';

@Component({
  selector: 'cx-address-form',
  templateUrl: './address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent implements OnInit, OnDestroy {
  countries$: Observable<Country[]>;
  titles$: Observable<Title[]>;
  regions$: Observable<Region[]>;
  selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  cities$: Observable<City[]>;
  selectedCity$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  districts$: Observable<District[]>;
  selectedRegion$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  townEnable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  @Input()
  addressData: Address;

  @Input()
  actionBtnLabel: string;

  @Input()
  cancelBtnLabel: string;

  @Input()
  setAsDefaultField: boolean;

  @Input()
  showTitleCode: boolean;

  @Input()
  showCancelBtn = true;

  @Output()
  submitAddress = new EventEmitter<any>();

  @Output()
  backToAddress = new EventEmitter<any>();

  addressVerifySub: Subscription;
  suggestedAddressModalRef: ModalRef;

  address: FormGroup = this.fb.group({
    defaultAddress: [false],
    titleCode: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    town: ['', Validators.required],
    region: this.fb.group({
      isocode: [null, Validators.required],
    }),
    country: this.fb.group({
      isocode: [null, Validators.required],
    }),
    postalCode: ['', Validators.required],
    phone: '',
    city: this.fb.group({
      isocode: [null, Validators.required]
    }),
    cityDistrict: this.fb.group({
      isocode: [null, Validators.required]
    }),
    cellphone: ['', Validators.required],
    district: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    protected checkoutDeliveryService: CheckoutDeliveryService,
    protected userService: UserService,
    protected userAddressService: UserAddressService,
    protected globalMessageService: GlobalMessageService,
    private modalService: ModalService,
    private featureConfigService: FeatureConfigService,
  ) {}

  ngOnInit() {
    // Fetching countries
    this.countries$ = this.userAddressService.getDeliveryCountries().pipe(
      tap(countries => {
        if (Object.keys(countries).length === 0) {
          this.userAddressService.loadDeliveryCountries();
        }
      })
    );

    // Fetching titles
    this.titles$ = this.userService.getTitles().pipe(
      tap(titles => {
        if (Object.keys(titles).length === 0) {
          this.userService.loadTitles();
        }
      }),
      map(titles => {
        const noneTitle = { code: '', name: 'Title' };
        return [noneTitle, ...titles];
      })
    );

    // Fetching regions
    this.regions$ = this.selectedCountry$.pipe(
      switchMap(country => this.userAddressService.getRegions(country)),
      tap(regions => {
        const regionControl = this.address.get('region.isocode');
        if (regions && regions.length > 0) {
          regionControl.enable();
        } else {
          regionControl.disable();
        }
      })
    );

    this.cities$ = this.selectedRegion$.pipe(
      switchMap(region => this.userAddressService.getCities(region)),
      tap(cities => {
        const cityControl = this.address.get('city.isocode');
        if(cities && cities.length > 0){
          cityControl.enable();
        }else{
          cityControl.disable();
        }
      })
    );

    this.districts$ = this.selectedCity$.pipe(
      switchMap(city => this.userAddressService.getDistricts(city)),
      tap(districts => {
        const districtControl = this.address.get('cityDistrict.isocode');
        if(districts && districts.length > 0){
          districtControl.enable();
        }else{
          districtControl.disable();
        }
      })
    );

    // verify the new added address
    this.addressVerifySub = this.checkoutDeliveryService
      .getAddressVerificationResults()
      .subscribe((results: AddressValidation) => {
        if (results === 'FAIL') {
          this.checkoutDeliveryService.clearAddressVerificationResults();
        } else if (results.decision === 'ACCEPT') {
          this.submitAddress.emit(this.address.value);
        } else if (results.decision === 'REJECT') {
          // TODO: Workaround: allow server for decide is titleCode mandatory (if yes, provide personalized message)
          if (
            results.errors.errors.some(error => error.subject === 'titleCode')
          ) {
            this.globalMessageService.add(
              { key: 'addressForm.titleRequired' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          } else {
            this.globalMessageService.add(
              { key: 'addressForm.invalidAddress' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
          this.checkoutDeliveryService.clearAddressVerificationResults();
        } else if (results.decision === 'REVIEW') {
          this.openSuggestedAddress(results);
        }
      });

    if (this.addressData) {
      this.address.patchValue(this.addressData);

      this.countrySelected(this.addressData.country);
      if (this.addressData.region) {
        this.regionSelected(this.addressData.region);
      }
      if(this.isChineseAddressEnabled()){
        if(this.addressData.city){
          this.citySelected(this.addressData.city);
        }
        if(this.addressData.cityDistrict){
          this.districtSelected(this.addressData.cityDistrict);
        }
      }
    }
  }

  titleSelected(title: Title): void {
    this.address['controls'].titleCode.setValue(title.code);
  }

  countrySelected(country: Country): void {
    this.address['controls'].country['controls'].isocode.setValue(
      country.isocode
    );
    this.selectedCountry$.next(country.isocode);
    if(this.isChineseAddressEnabled()){
      this.selectedRegion$.next('');
      this.selectedCity$.next('');
      if(country.isocode === 'CN'){
        this.townEnable$.next(false);
        this.address['controls'].cellphone.enable();
        this.address['controls'].district.enable();
      }else{
        this.townEnable$.next(true);
        this.address['controls'].cellphone.disable();
        this.address['controls'].district.disable();
      }
    }
  }

  regionSelected(region: Region): void {
    this.address['controls'].region['controls'].isocode.setValue(
      region.isocode
    );
    if(this.isChineseAddressEnabled()){
      this.selectedRegion$.next(region.isocode);
      this.selectedCity$.next('');
    }
  }

  citySelected(city: City): void {
    this.address['controls'].city['controls'].isocode.setValue(
      city.isocode
    );
    this.address['controls'].town.setValue(
      city.isocode
    );
    this.selectedCity$.next(city.isocode);
  }

  districtSelected(district: District): void {
    this.address['controls'].cityDistrict['controls'].isocode.setValue(
      district.isocode
    );
    this.address['controls'].district.setValue(
      district.isocode
    );
  }

  toggleDefaultAddress(): void {
    this.address['controls'].defaultAddress.setValue(
      this.address.value.defaultAddress
    );
  }

  back(): void {
    this.backToAddress.emit();
  }

  verifyAddress(): void {
    this.checkoutDeliveryService.verifyAddress(this.address.value);
  }

  openSuggestedAddress(results: AddressValidation): void {
    if (!this.suggestedAddressModalRef) {
      this.suggestedAddressModalRef = this.modalService.open(
        SuggestedAddressDialogComponent,
        { centered: true, size: 'lg' }
      );
      this.suggestedAddressModalRef.componentInstance.enteredAddress = this.address.value;
      this.suggestedAddressModalRef.componentInstance.suggestedAddresses =
        results.suggestedAddresses;
      this.suggestedAddressModalRef.result
        .then(address => {
          this.checkoutDeliveryService.clearAddressVerificationResults();
          if (address) {
            address = Object.assign(
              {
                titleCode: this.address.value.titleCode,
                phone: this.address.value.phone,
                selected: true,
              },
              address
            );
            this.submitAddress.emit(address);
          }
          this.suggestedAddressModalRef = null;
        })
        .catch(() => {
          // this  callback is called when modal is closed with Esc key or clicking backdrop
          this.checkoutDeliveryService.clearAddressVerificationResults();
          const address = Object.assign(
            {
              selected: true,
            },
            this.address.value
          );
          this.submitAddress.emit(address);
          this.suggestedAddressModalRef = null;
        });
    }
  }

  private isChineseAddressEnabled(): boolean{
    return this.featureConfigService.isEnabled('chineseAddress');
  }

  ngOnDestroy() {
    this.checkoutDeliveryService.clearAddressVerificationResults();

    if (this.addressVerifySub) {
      this.addressVerifySub.unsubscribe();
    }
  }
}
