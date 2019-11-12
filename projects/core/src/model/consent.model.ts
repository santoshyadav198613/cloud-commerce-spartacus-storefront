import { Observable } from 'rxjs';

export interface ConsentTemplate {
  id?: string;
  name?: string;
  description?: string;
  version?: number;
  currentConsent?: Consent;
}

export interface Consent {
  code?: string;
  consentGivenDate?: Date;
  consentWithdrawnDate?: Date;
}

export interface AnonymousConsent {
  templateCode?: string;
  version?: number;
  consentState?: ANONYMOUS_CONSENT_STATUS;
}

export enum ANONYMOUS_CONSENT_STATUS {
  GIVEN = 'GIVEN',
  WITHDRAWN = 'WITHDRAWN',
}

export interface CommonConsent {
  /**
   * Returns all consent templates.
   */
  loadTemplates(): void;
  /**
   * Returns an indicator for the loading status for the templates.
   */
  getLoadTemplatesLoading(): Observable<boolean>;
  /**
   * Returns an indicator for the success status for the templates.
   */
  getLoadTemplatesSuccess(): Observable<boolean>;
  /**
   * Returns an indicator for the error status for the templates.
   */
  getLoadTemplatesError(): Observable<boolean>;
  /**
   * Resets the loading, success and error indicators for the templates.
   */
  resetLoadTemplatesState(): void;
  /**
   * Returns all the consent templates.
   */
  getTemplates(): Observable<ConsentTemplate[]>;
  /**
   * Returns the consent template for the given template code.
   * @param templateId a template code by which to filter templates.
   */
  getTemplate(templateId: string): Observable<ConsentTemplate>;
  /**
   * Returns the consent with the given template code.
   * @param templateId a template code by which to filter the consent templates.
   */
  getConsent(templateId: string): Observable<AnonymousConsent | Consent>;
  /**
   * Give consent for specified parameter(s).
   * If used in context of registered consents, `consentTemplateVersion` needs to be provided
   *
   * @param templateId for which to give the consent
   * @param consentTemplateVersion a template version for which to give the consent. Used only in context of registered consents
   */
  giveConsent(templateId: string, consentTemplateVersion?: number): void;
  /**
   * Withdraw consent for the given `consentCode`
   * @param templateIdOrConsentCode in context of anonymous consents the consumer should pass template id. In context of registered user consents, the consumer should provide a consent code.
   */
  withdrawConsent(templateIdOrConsentCode: string): void;
}
