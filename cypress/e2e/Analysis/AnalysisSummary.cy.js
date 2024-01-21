describe('Pruebas para AnalysisSummary', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.login();
  });

  it('se renderiza sin errores', () => {
    goToMyData();
    cy.get('.analysis-summary').should('exist');
  });

  it('muestra datos de análisis en la tabla', () => {
    goToMyData();
    cy.getByTestId('cell-value-0').should('contain', '10');
    cy.getByTestId('cell-value-1').should('contain', '20');
  });

  it('abrir y cerrar el modal de detalles', () => {
    goToMyData();
    cy.getByTestId('cell-action-0').within(() => {
      cy.get('button').click();
    });

    cy.get('.p-dialog-title').should('be.visible').and('contain', 'Medición 1');
    cy.get('.p-dialog-header-close').click();
    cy.get('.p-dialog-title').should('not.exist');
  });

  it('formato de fecha correcto en la tabla', () => {
    goToMyData();
    cy.getByTestId('cell-measurementDate-0')
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

function mockAnalysisData() {
  cy.fixture('analysisMock.json').then((response) => {
    cy.intercept('GET', '/api/v1/analysis?userId*', {
      statusCode: 200,
      body: response,
    });
  });
}

function mockMeasurementData() {
  cy.fixture('measurementMock.json').then((response) => {
    cy.intercept('GET', '/api/v1/measurement/*', {
      statusCode: 200,
      body: response,
    });
  });
}

function goToMyData() {
  mockUserData();
  mockAnalysisData();
  mockMeasurementData();
  cy.getTopNavItemByText('My data').click();
  cy.get('.p-card-title').contains('Perfil de Usuario');
  cy.getByTestId('http-spinner').should('not.exist');
}
