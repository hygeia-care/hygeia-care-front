
describe('Pruebas para Appointment Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.login();
    
  });


  it('Accede a mis citas', () => {
    goToMyAppointments();
    cy.get('h1').should('contain', 'MIS CITAS');
  });

  it('Elimina una cita', () => {
    
    goToMyAppointments();
    cy.get('button .pi-trash').first().click();
    cy.window().then(win => {
      cy.stub(win, 'confirm').returns(true);
    });
  });

  it('Verifica la eliminación', () => {
    goToMyAppointments();
    cy.get('.table-container').should('not.contain', 'Asunto de la cita');
  });
});


function mockAppointmentsData() {
  cy.fixture('appointmentData.json').then((response) => {
    cy.intercept('GET', '/api/v1/appointments/patients/*', { 
      statusCode: 200,
      body: response,
    }).as('appointmentData');
  });
}

function goToMyAppointments() {
  mockAppointmentsData();
  cy.getTopNavItemByText('My appointments').click();
  cy.wait('@appointmentData'); 
  cy.get('.table-container').should('be.visible'); 
}









