
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
    
    mockDeleteAppointment()
    goToMyAppointments();
    cy.get('button .pi-trash').first().click({ force: true });

    cy.window().then(win => {
      cy.stub(win, 'confirm').returns(true);
    });
  });

  it('Verifica la eliminación', () => {
    goToMyAppointments();
    cy.get('.table-container').should('not.contain', 'Cita otorrino');
  });
});


function mockAppointmentsData() {
  cy.fixture('appointmentData.json').then((response) => {
    cy.intercept('GET', '/api/v1/appointments/patients/*', (req) => {
      // Registro de la solicitud
      console.log('Solicitud GET realizada:', req);

      req.reply({
        statusCode: 200,
        body: response,
      });

      // Registro de la respuesta
      req.on('response', (res) => {
        console.log('Respuesta recibida:', res);
      });
    }).as('appointmentData');
  });
}


function goToMyAppointments() {
  mockAppointmentsData();
  cy.getTopNavItemByText('My appointments').click();
  cy.wait('@appointmentData'); 
  cy.get('.table-container').should('be.visible'); 
}

function mockDeleteAppointment() {
  cy.intercept('DELETE', '/api/v1/appointments/date/*', (req) => {

    req.reply({
      statusCode: 200, 
      body: 'Cita eliminada exitosamente' 
    });

    console.log('Solicitud DELETE interceptada:', req);
  }).as('deleteAppointment');
}










