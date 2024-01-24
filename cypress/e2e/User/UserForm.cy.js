describe('Pruebas para Registro Usuario', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('se renderiza sin errores', () => {
    goToForm();
    cy.get('button[type="submit"]').should('exist');
  });

  it('escenario correcto', () => {
    goToForm();
    cy.get('button[type="submit"]').click(); // Enviar el formulario
    cy.get('.card > h1').contains('Datos'); // Hay errores

    cy.get('#nombre').type('Nombre de Prueba');
    cy.get('#surnames').type('Apellidos de Prueba');
    cy.get('#email').type('email@deprueba.com');
    cy.get('#password').type('Contraseña123');
    cy.get('#companiaSanitaria').type('Compañía de Prueba');
    cy.get('#tarjetaSanitaria').type('1234567890');

    mockUserCreate();
    // Enviar el formulario
    cy.get('button[type="submit"]').click();
    cy.getByTestId('http-spinner').should('not.exist');
    cy.get('div.modal-header').contains('Registro Exitoso'); // Cerrar
    cy.get('div.modal-footer > button').click(); // Cerrar
    cy.get('.card > h1').contains('Login'); // Hay errores
  });
});

describe('Pruebas para Editar Usuario', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(true);
  });

  it('edición usuario ', () => {
    mockUserData();
    mockUserEdit();
    mockAnalysisData();
    mockMeasurementData();
    cy.getTopNavItemByText('All patients').click();
    cy.getByTestId('http-spinner').should('not.exist');
    cy.get('.profile-actions').get('[aria-label="Editar"]').click();
    cy.get('.p-dialog-title').should('exist');
    cy.get('input[name="nombre"]').type('Nombre de Prueba');
    cy.get('input[name="apellidos"]').type('Apellidos de Prueba');
    cy.get('input[name="email"]').type('email@deprueba.com');
    cy.get('input[name="companiaSanitaria"]').type('Compañía de Prueba');
    cy.get('input[name="tarjetaSanitaria"]').type('1234567890');
    cy.get('input[name="password"]').type('password123');
    cy.get('.edit-dialog-footer').get('[aria-label="Guardar"]').click();
    cy.getByTestId('http-spinner').should('not.exist');
    cy.get('.p-dialog-title').should('not.exist');
  });

  it('borrado usuario ', () => {
    mockUserData();
    mockUserDelete();
    mockAnalysisData();
    mockMeasurementData();
    cy.getTopNavItemByText('All patients').click();
    cy.getByTestId('http-spinner').should('not.exist');
    cy.get('.profile-actions').get('[aria-label="Eliminar"]').click();
    cy.get('.p-dialog-footer')
      .find('.p-button-danger[aria-label="Eliminar"]')
      .click();

    cy.getByTestId('http-spinner').should('not.exist');
  });
});

function mockUserCreate() {
  cy.intercept('POST', '/api/v1/auth/users', {
    statusCode: 201,
  });
}

function mockUserEdit() {
  cy.intercept('PUT', '/api/v1/auth/users/*', {
    statusCode: 201,
  });
}

function mockUserDelete() {
  cy.intercept('DELETE', '/api/v1/auth/users/*', {
    statusCode: 201,
  });
}

function mockUserData() {
  cy.fixture('userData.json').then((response) => {
    cy.intercept('GET', '/api/v1/auth/users/*', {
      statusCode: 201,
      body: response,
    });
  });
}

function mockAnalysisData() {
  cy.fixture('analysisMock.json').then((response) => {
    cy.intercept('GET', '/api/v1/analysis*', {
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

function goToForm() {
  cy.getTopNavItemByText('Create account').click();
  cy.get('.card > h1').contains('Datos');
  cy.getByTestId('http-spinner').should('not.exist');
}
