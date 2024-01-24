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
    mockLogin(isAdmin?: string): Chainable<void>;
    login(isAdmin?: string): Chainable<void>;
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
    getTopNavItemByText(itemText: string): Chainable<JQuery<HTMLElement>>;
  }
}

// cypress/support/commands.js

Cypress.Commands.add('mockLogin', (isAdmin) => {
  cy.fixture('mockLogin.json').then((response) => {
    if (isAdmin) {
      response.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODliYTJkYzg1MTIzMmEyODlhNTY1YiIsInJvbCI6IkFkbWluIiwiaWF0IjoxNzA0OTM3NzMzfQ.ZgckwkukWGP4fERL3hRDlLKv_lSDowk7-ZmRzrIDivs"; // Ponemos usuario admin
    }
    cy.intercept('POST', '/api/v1/auth/users/login', {
      statusCode: 200,
      body: response,
    }).as('login');
  });
});

Cypress.Commands.add('getByTestId', (testId) => {
  cy.get(`[data-testid="${testId}"]`, { timeout: 10000 });
});

Cypress.Commands.add('getTopNavItemByText', (itemText) => {
  cy.getByTestId('menubar').should('exist').contains(itemText);
});

Cypress.Commands.add('login', (isAdmin) => {
  cy.mockLogin(isAdmin);
  cy.getTopNavItemByText('Login').click();
  cy.get('input#username').type('username');
  cy.get('input#password').type('password');
  cy.get('button[type="submit"]').click();
  cy.getByTestId('http-spinner').should('not.exist');
  cy.getByTestId('menubar').should('exist');
});
