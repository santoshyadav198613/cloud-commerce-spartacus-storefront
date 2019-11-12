import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AnonymousConsentsService } from '../../anonymous-consents/index';
import { AuthService } from '../../auth/index';
import { AnonymousConsent, Consent } from '../../model/index';
import { UserConsentService } from './user-consent.service';

// TODO:#5361 - write comments
@Injectable({ providedIn: 'root' })
export class ConsentService {
  constructor(
    protected anonymousConsentsService: AnonymousConsentsService,
    protected userConsentService: UserConsentService,
    protected authService: AuthService
  ) {}

  getConsent(templateCode: string): Observable<AnonymousConsent | Consent> {
    return this.authService.isUserLoggedIn().pipe(
      switchMap(authenticated =>
        authenticated
          ? this.userConsentService.getConsent(templateCode)
          : this.anonymousConsentsService.getConsent(templateCode)
      ),
      distinctUntilChanged()
    );
  }
}
