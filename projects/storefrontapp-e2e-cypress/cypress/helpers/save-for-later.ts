import * as cart from './cart'

const product0 = cart.products[0];
const product1 = cart.products[1];
const product2 = cart.products[2];

const products = [product0, product1]
function getCartItem(name: string) {
    return cy.get('cx-cart-item-list').contains('cx-cart-item', name);
  }

function checkMiniCartCount(expectedCount) {
    return cy.get('cx-mini-cart').within(() => {
        cy.get('.count').should('contain', expectedCount);
  });
}

function checkCartSummary(subtotal: string) {
    cy.get('cx-order-summary').within(() => {
      cy.get('.cx-summary-row:first').contains('Subtotal');
      cy.get('.cx-summary-amount').should('contain', subtotal);
    });
}

function goToFirstProductFromSearch(id: string, mobile: boolean) {
    cy.get('cx-storefront.stop-navigating');
    if (mobile) {
      cy.get('cx-searchbox cx-icon[aria-label="search"]').click();
      cy.get('cx-searchbox input')
        .clear({ force: true })
        .type(id, { force: true })
        .type('{enter}', { force: true });
      cy.get('cx-product-list-item')
        .first()
        .get('.cx-product-name')
        .first()
        .click();
    } else {
      cy.get('cx-searchbox input')
        .clear({ force: true })
        .type(id, { force: true });
      cy.get('cx-searchbox')
        .get('.results .products .name')
        .first()
        .click({ force: true });
    }
  }

export function chekSaveForLaterCounts(count: string){

}

export function addProductsWhenLoggedIn(mobile: boolean){

    products.forEach(product => {
        goToFirstProductFromSearch(product.code, mobile);
        cart.addToCart();
        cart.closeAddedToCartDialog();
        checkMiniCartCount(1).click({ force: true });
        cart.checkProductInCart(product);
    });

}

export function saveForLater(name: string) {
    getCartItem(name).within(() => {
        cy.getByText('Save for Later').click();
      });
}

export function moveToCart(name: string) {
    getCartItem(name).within(() => {
        cy.getByText('Move to Cart').should('not.be.disabled')
        .then(el => {
          cy.wrap(el).click();
        });;
      });
}

export function deleteSaveForLaterItem(name: string) {
    getCartItem(name).within(() => {
        cy.getByText('Remove').click();
      });
}

export function verifySaveForLaterAsAnonymous(){
    cy.visit('/cart');
    saveForLater(product2.name);
    cy.location('pathname').should('contain', '/login');
}

export function verifySaveForLaterAsCustomer(){
    //chekSaveForLaterCounts("0");

    saveForLater(product0.name);
    checkMiniCartCount(1).click({ force: true });
    checkCartSummary("$114.12");

    //chekSaveForLaterCounts("1");

    saveForLater(product1.name);
    checkMiniCartCount(0).click({ force: true });

   // chekSaveForLaterCounts("1");

    //deleteSaveForLaterItem(product0.name);
    //cy.wait(500);
    getCartItem(product0.name).within(() => {
        cy.getByText('Move to Cart').click();
      });

      getCartItem(product1.name).within(() => {
        cy.getByText('Move to Cart').click();
      });
    //cy.wait(500);
    //moveToCart(product1.name);

    //checkCartSummary("$192.98");
    //checkMiniCartCount(2).click({ force: true });
    deleteSaveForLaterItem(product0.name);
    deleteSaveForLaterItem(product1.name);
    cart.validateEmptyCart();
}