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

    cy.get('.p-datatable-tbody').children().its('length').then((size) => {
      if (size > 0) {
        cy.get('.p-button-danger[data-pc-name="button"][data-pc-section="root"]').first().click();

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
      } else {
        // No hay citas para eliminar
        cy.log('No hay citas disponibles para eliminar');
      }
    });
  });
});
