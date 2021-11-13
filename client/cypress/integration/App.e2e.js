/* eslint-disable no-undef */

describe('E2E 연습', () => {
  before(() => {
    cy.visit('');
    cy.waitForReact();
  });

  it('헤더가 있어야 한다', () => {
    cy.react('Header').should('have.length', '1');
    cy.react('NavItem', { props: { title: '멘토 찾기' } }).click();
    cy.react('Profile').should('have.length', '1');
    cy.react('NavItem').should('have.length', '3');
  });
});
