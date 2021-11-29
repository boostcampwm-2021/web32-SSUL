/* eslint-disable @typescript-eslint/no-namespace */

declare namespace Cypress {
  interface Chainable<> {
    set(): void;
    login(role: string): void;
    authenficate(): void;
  }
}

Cypress.Commands.add('set', () => {
  cy.intercept('GET', '/api/category', { fixture: 'category.json' });
  cy.intercept('GET', '/api/techstack', { fixture: 'techstack.json' });
  cy.intercept('GET', '/api/auth/silent-refresh', { fixture: 'silent-refresh.json' });
});

Cypress.Commands.add('login', (role: string) => {
  cy.intercept('GET', '/api/auth/silent-refresh', { fixture: `auth/${role}-auth.json` });
});

Cypress.Commands.add('authenficate', () => {
  cy.intercept('GET', '/api/auth', { statusCode: 200 });
  cy.intercept('GET', '/api/auth/group/belong?gid=1', { statusCode: 200 });
  cy.intercept('GET', '/api/auth/group/owner?gid=1', { statusCode: 200 });
});
