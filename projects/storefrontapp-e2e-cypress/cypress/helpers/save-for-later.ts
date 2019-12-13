import * as cart from './cart';

// const product0 = cart.products[0];
// const product1 = cart.products[1];
// const product2 = cart.products[2];
// const products = [product0, product1];

interface TestProduct {
  code: string;
  name?: string;
  price?: number;
}

enum Position {
  Cart,
  SaveForLater,
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);

export const products: TestProduct[] = [
  {
    code: '300938',
    name: 'Photosmart E317 Digital Camera',
    price: 108.69,
  },
  {
    code: '1934793',
    name: 'PowerShot A480',
    price: 95.1,
  },

  {
    code: '1978440_red',
    name: 'DSC-H20 Red',
    price: 531.81,
  },
];

export function getItem(product, position: Position) {
  if (Position.Cart === position) {
    return cy
      .get('cx-cart-details > .cart-details-wrapper > cx-cart-item-list')
      .contains('cx-cart-item', product.name);
  } else {
    return cy
      .get('cx-save-for-later > .cart-details-wrapper > cx-cart-item-list')
      .contains('cx-cart-item', product.name);
  }
}

// export function waitForCartRefresh() {
//   cy.server();

//   cy.route(
//     'GET',
//     `/rest/v2/electronics-spa/users/*/carts/*?fields=*&lang=en&curr=USD`
//   ).as('refresh_cart');
// }
// export function waitForSflRefresh() {
//   cy.server();

//   cy.route(
//     'GET',
//     `/rest/v2/electronics-spa/users/*/carts/selectivecart*?fields=*&lang=en&curr=USD`
//   ).as('refresh_sfl');
// }

export function moveItem(
  product,
  targetPosition: Position,
  isAnonymous: boolean = false
) {
  cart.waitForCartRefresh();
  // waitForSflRefresh();
  const currentPosition =
    Position.Cart === targetPosition ? Position.SaveForLater : Position.Cart;
  getItem(product, currentPosition).within(() => {
    cy.get('.cx-slf-btn > .link').click();
  });

  if (!isAnonymous) {
    //wait fpr cart
    cy.wait('@refresh_cart');
    //wait fpr sfl
    // cy.wait('@refresh_cart');
    validateProduct(product, 1, targetPosition);
  }
}

export function removeItem(product, position: Position) {
  cart.waitForCartRefresh();
  // waitForSflRefresh();
  getItem(product, position).within(() => {
    cy.get('.cx-remove-btn > .link')
      .should('not.be.disabled')
      .then(el => {
        cy.wrap(el).click();
      });
  });

  //wait fpr cart
  cy.wait('@refresh_cart');
  //wait fpr sfl
  // cy.wait('@refresh_sfl');
}

// function checkCartSummary(subtotal: string) {
//   cy.get('cx-order-summary').within(() => {
//     cy.get('.cx-summary-row:first').contains('Subtotal');
//     cy.get('.cx-summary-amount').should('contain', subtotal);
//   });
// }

export function validateProduct(product, qty = 1, position: Position) {
  return getItem(product, position).within(() => {
    cy.get('.cx-price>.cx-value').should('contain', formatPrice(product.price));
    if (Position.Cart === position) {
      cy.get('.cx-counter-value').should('have.value', `${qty}`);
    } else {
      cy.get('.cx-quantity > .cx-value').should('contain', `${qty}`);
    }
    cy.get('.cx-total > .cx-value').should('exist');
    cy.root();
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

export function checkMiniCartCount() {
  return cy.get('cx-mini-cart').within(() => {
    cy.get('.count').should('not.be', 0);
  });
}

// export function checkCount(position: Position, expectedCount: number) {
//   if (Position.Cart === position) {
//     return cy
//       .get(
//         ' cx-cart-details > .cart-details-wrapper > cx-cart-item-list > .cx-item-list-row'
//       )
//       .should('have.length', expectedCount);
//   } else {
//     return cy
//       .get(
//         ' cx-save-for-later > .cart-details-wrapper > cx-cart-item-list > .cx-item-list-row'
//       )
//       .should('have.length', expectedCount);
//   }
// }

export function addProductsWhenLoggedIn(mobile: boolean) {
  products.forEach(product => {
    goToFirstProductFromSearch(product.code, mobile);
    cart.addToCart();
    cart.closeAddedToCartDialog();
    checkMiniCartCount().click({ force: true });
    validateProduct(product, 1, Position.Cart);
  });
}

export function verifySaveForLaterAsAnonymous() {
  cart.addProductAsAnonymous();
  cart.registerCartUser();
  cy.visit('/cart');
  moveItem(products[0], Position.SaveForLater, true);
  cy.location('pathname').should('contain', '/login');
  cart.loginCartUser();
  cy.visit('/cart');
  validateProduct(products[0], 1, Position.Cart);
  moveItem(products[0], Position.SaveForLater);
  moveItem(products[0], Position.Cart);
}

export function verifySaveForLaterAsCustomer() {
  //Move 0 1 to SFL
  moveItem(products[0], Position.SaveForLater);
  moveItem(products[1], Position.SaveForLater);

  //Move 0 to cart and 2 to SFL
  moveItem(products[0], Position.Cart);
  moveItem(products[2], Position.SaveForLater);

  //Remove 0 form cart and move 1 to cart
  removeItem(products[0], Position.Cart);
  moveItem(products[1], Position.Cart);

  //Remove 1 form cart and 2 from SFL
  removeItem(products[1], Position.Cart);
  removeItem(products[2], Position.SaveForLater);

  cart.validateEmptyCart();
}
