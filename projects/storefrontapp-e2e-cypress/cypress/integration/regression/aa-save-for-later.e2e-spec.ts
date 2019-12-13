import * as saveForLater from '../../helpers/save-for-later';

// describe('Save for later - guest', () => {
//   before(() => {
//     cy.window().then(win => win.sessionStorage.clear());
//     cy.visit('/');
//   });

//   it('should register and login first for anonymous user', () => {
//     saveForLater.verifySaveForLaterAsAnonymous();
//   });
// });

describe('Save for later - customer', () => {
  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.requireLoggedIn();
    cy.reload();
    cy.visit('/');
    saveForLater.addProductsWhenLoggedIn(false);
  });

  it('should save for later and move to cart for items', () => {
    saveForLater.verifySaveForLaterAsCustomer();
  });
});
