describe('Pruebas para MyAppointments', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.login();
    cy.visit('http://localhost:3000/appointments');
  });

  it('Comprobar que estamos en mis citas', () => {
    cy.get('h1').should('contain', 'MIS CITAS');
  });

  it('Eliminar una cita si hay citas programadas', () => {
  
    cy.get('.p-button-danger[data-pc-name="button"][data-pc-section="root"]').first().click();
  
    cy.window().then(win => {
      cy.stub(win, 'confirm').returns(true);
    });
  
  });
  
});
