describe('Pruebas para AnalysisSummary', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.login();
  });

  it('se renderiza sin errores', () => {
    goToMyData();
    cy.get('.analysis-summary').should('exist');
  });

  it('muestra datos de análisis en la tabla', () => {
    goToMyData();
    cy.get('[data-testid="cell-value-0"]').should('contain', '10');
    cy.get('[data-testid="cell-value-1"]').should('contain', '20');
  });

  it('abrir y cerrar el modal de detalles', () => {
    goToMyData();
    cy.get('[data-testid="cell-action-0"]').within(() => {
      cy.get('button').click();
    });

    cy.get('.p-dialog-title').should('be.visible').and('contain', 'Medición 1');
    cy.get('.p-dialog-header-close').click();
    cy.get('.p-dialog-title').should('not.exist');
  });

  it('formato de fecha correcto en la tabla', () => {
    goToMyData();
    cy.get('[data-testid="cell-measurementDate-0"]')
      .invoke('text')
      .should('match', /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/);
  });
});

function mockUserData() {
  cy.fixture('userData.json').then((response) => {
    cy.intercept('GET', '/api/v1/auth/users/*', {
      statusCode: 200,
      body: response,
    }).as('userData');
  });
}

function goToMyData() {
  mockUserData();
  cy.getTopNavItemByText('My data').click();
}
