
describe('Pruebas para Appointment Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.login();
  });


  it('Accede a mis citas', () => {
    goToMyAppointments();
    cy.get('h1').should('contain', 'MIS CITAS');
    cy.get('.table-container').should('contain', 'Cita Otorrino');
  });

  it('Elimina una cita', () => {
    
    goToMyAppointments();

    cy.get('.table-container').should('contain', 'Cita Otorrino');
    
    mockDeleteAppointment()

    cy.get('.p-button-danger').first().click();
    cy.get('.p-button-text').eq(1).click();

    cy.wait('@deleteAppointment');

    //Verificación
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
  cy.get('.table-container').should('be.visible'); 
}

function mockDeleteAppointment() {
  cy.intercept('DELETE', '/api/v1/appointments/date/2023-12-01T14:00:00.000Z/patient/6589ba2dc851232a289a565b', (req) => {

    req.reply({
      statusCode: 200, 
      body: 'Cita eliminada exitosamente' 
    });

    console.log('Solicitud DELETE interceptada:', req);
  }).as('deleteAppointment');
}










