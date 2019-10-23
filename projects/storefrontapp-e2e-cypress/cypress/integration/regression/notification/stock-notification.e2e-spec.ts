import * as notification from '../../../helpers/notification';
describe('stock notification', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  describe('Stock Notification for Guest', () => {
    before(() => {
      cy.visit('/');
    });
    notification.stockNotificationGuestTests();
  });

  describe('Stock Notification for Customer without Channel Enbaled', () => {
    before(() => {
      notification.registerAndLogin();
      cy.reload();
      cy.visit('/');
    });
    notification.stockNotificationCustomerNoChannelSetTests();
  });

  describe('Stock Notification for Customer  with Channel Enbaled', () => {
    before(() => {
      notification.registerAndLogin();
      cy.reload();
      cy.visit('/');
      notification.enableNotificationPreferenceChannel();
    });
    beforeEach(() => {
      notification.navigateToPDP(notification.normalProductCode);
      cy.restoreLocalStorage();
    });

    notification.stockNotificationCustomerTests();
  });
});