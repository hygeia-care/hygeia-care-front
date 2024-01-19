// Definiciones de funciones mock
function mockAppointmentsData(appointments) {
  cy.intercept('GET', '/api/v1/appointments', (req) => {
    req.reply({
      statusCode: 200,
      body: appointments,
    });
  }).as('appointmentsData');
}

describe('Pruebas para eliminar Appointment', () => {
  beforeEach(() => {
    // Preparar datos mock para las citas
    const mockData = [
      {
        nameDoctor: 'DoctorEliminar',
        lastnameDoctor: 'ApellidoDoctorEliminar',
        idPatient: '6589ba2dc851232a289a565b',
        namePatient: 'Juan',
        lastnamePatient: 'Noguerol T',
        date: new Date('2024-01-19T18:30:00.000Z'),
        subject: 'AsuntoEliminar'
      },
    ];

    mockAppointmentsData(mockData);

    cy.visit('http://localhost:3000');
    cy.login();
    cy.visit('http://localhost:3000/appointments');
  });

  it('Acceder a mis citas', () => {
    cy.get('h1').should('contain', 'MIS CITAS');
  });

  it('Eliminar una cita y verificar la eliminación', () => {
    // Esperar a que los datos de las citas se carguen
    cy.wait('@appointmentsData');

    // Verificar si la tabla de citas está presente o si se muestra el mensaje "No hay citas programadas"
    cy.get('.table-container').then(($container) => {
      if ($container.find('.p-datatable-tbody').children().length > 0) {
        // La tabla de citas está presente, procedemos con la eliminación

        // Obtener el número de filas antes de eliminar
        cy.get('.p-datatable-tbody').children().its('length').then((size) => {
          cy.get('button .pi-trash').first().click();

          // Confirmar la eliminación en una ventana de diálogo
          cy.on('window:confirm', () => true);

          // Esperar a que los datos actualizados de las citas se carguen
          cy.wait('@appointmentsData');

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
