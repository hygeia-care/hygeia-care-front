/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// cypress/types/index.d.ts

declare namespace Cypress {
  interface Chainable {
    mockLogin(): Chainable<void>;
    login(): Chainable<void>;
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    getTopNavItemByText(itemText: string): Chainable<JQuery<HTMLElement>>;
  }
}

// cypress/support/commands.js

Cypress.Commands.add('mockLogin', () => {
  cy.fixture('mockLogin.json').then((response) => {
    cy.intercept('POST', '/api/v1/auth/users/login', {
      statusCode: 200,
      body: response,
    }).as('login');
  });
});

Cypress.Commands.add('getByTestId', (testId) => {
  cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getTopNavItemByText', (itemText) => {
  cy.getByTestId('menubar').should('exist').contains(itemText);
});

Cypress.Commands.add('login', () => {
  cy.getTopNavItemByText('Login').click();
  cy.get('input#username').type('username');
  cy.get('input#password').type('password');
  cy.mockLogin();
  cy.get('button[type="submit"]').click();
  cy.getByTestId('menubar').should('exist');
  cy.getTopNavItemByText('My data').should('exist');
});
