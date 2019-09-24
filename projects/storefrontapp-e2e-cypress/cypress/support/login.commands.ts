import { login, formatToken } from './utils/login';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Headless login
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.login(username, password)
        ```
       */
      login: (username: string, password: string) => void;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.server();
  login(username, password).then(res => {
    cy.window().then((win: any) => {
      win.spartacus.authorizeWithToken(JSON.stringify(formatToken(res.body)));
    })
    // setSessionData(res.body);
  });
});
