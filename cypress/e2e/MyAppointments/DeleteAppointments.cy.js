// Definiciones de funciones mock
function mockAppointmentsData(appointments) {
  cy.intercept('GET', '/api/v1/appointments', {
    statusCode: 200,
    body: appointments,
  }).as('appointmentsData');
}

describe('Pruebas para eliminar Appointment', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.login();
    cy.visit('http://localhost:3000/appointments');
  });

  it('Acceder a mis citas', () => {
    cy.get('h1').should('contain', 'MIS CITAS');
  });

  it('Eliminar una cita y verificar la eliminación', () => {
    cy.wait(2000);

    // Verificar si la tabla de citas está presente o si se muestra el mensaje "No hay citas programadas"
    cy.get('.table-container').then(($container) => {
      if ($container.find('.p-datatable-tbody').children().length > 0) {
        // La tabla de citas está presente, procedemos con la eliminación

        // Obtener el número de filas antes de eliminar
        cy.get('.p-datatable-tbody').children().its('length').then((size) => {
          // Recargar la página para reflejar los cambios
          cy.reload();

          // Esperar que la página se recargue completamente
          cy.wait(2000);

          cy.get('button .pi-trash').first().click();

          // Confirmar la eliminación en una ventana de diálogo
          cy.window().then(win => {
            cy.stub(win, 'confirm').returns(true);
          });

          cy.wait(2000);

          // Recargar la página para reflejar los cambios
          cy.reload();

          // Esperar que la página se recargue completamente
          cy.wait(2000);

          if (size === 1) {
            // Verificar que aparezca el mensaje de "No hay citas programadas"
            cy.get('.table-container').should('contain', 'No hay citas programadas.');
          } else {
            // Verificar que el número de citas ha disminuido
            cy.get('.p-datatable-tbody').children().should('have.length', size - 1);
          }
        });
      } else {
        // No hay citas disponibles para eliminar
        cy.log('No hay citas disponibles para eliminar');
      }
    });
  });
});