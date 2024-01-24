
describe('Pruebas para Appointment Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.login();
    cy.visit('http://localhost:3000/appointments');

  });
  it('Accede a mis citas', () => {
    mockUserData();
    goToMyAppointments();
    cy.get('h1').should('contain', 'MIS CITAS');
    mockAppointmentsData();
    cy.get('.table-container').should('contain', 'Cita Otorrino');

  });
  it('Visualizar y Eliminar mis citas en la tabla', () => {
    mockUserData();
    goToMyAppointments();
    mockAppointmentsData();
    cy.get('.table-container').should('contain', 'Cita Otorrino');
  });

  it('Elimina una cita', () => {
    /*
    mockUserData()
    goToMyAppointments();
    cy.get('.table-container').should('contain', 'Cita Otorrino');
    
    mockDeleteAppointment()

    cy.get('.p-button-danger').first().click();
    cy.get('.p-button-text').eq(1).click();

    //Verificación
    cy.get('.table-container').should('not.contain', 'Cita Otorrino');
    */
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

  //Este get se hace porque según la estructura de mi front, despues de elimiar un cita, se llama otra vez a todas las citas, entonces ese get se interceptaba y no volvíamos a las mismas.
  cy.intercept('GET', '/api/v1/appointments/patients/*', {
    statusCode: 200,
    body: [] 
  }).as('appointmentData');
}

function mockUserData() {
  cy.fixture('userData.json').then((response) => {
    cy.intercept('GET', '/api/v1/auth/users/*', {
      statusCode: 200,
      body: response,
    }).as('userData');
  });
}


