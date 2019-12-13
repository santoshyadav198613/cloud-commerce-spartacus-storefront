import * as saveForLater from '../../helpers/save-for-later';
import * as cart from '../../helpers/cart'

describe('Save for later - guest', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
    cy.visit('/');
    cart.addProductAsAnonymous();
  });

  it('should redirect to login page for anonymous user', () => {
    saveForLater.verifySaveForLaterAsAnonymous();
  });

});


describe('Save for later - customer', () => {
    before(() => {
      cy.window().then(win => win.sessionStorage.clear());
      cart.registerCartUser();
      cart.loginCartUser();
      saveForLater.addProductsWhenLoggedIn(false);
      cy.visit('/cart');
    });
  
    it('should save for later and move to cart for cart items', () => {
      saveForLater.verifySaveForLaterAsCustomer();
    });
});