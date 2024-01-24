describe('Pruebas para BillPages', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.login();
    });

    it('Se renderiza sin errores', () => {
        goToMyBills();
        cy.get('#table-bills').should('exist');
    });

    it('Muestra sección para añadir nueva factura', () => {
        goToMyBills();
        cy.get('button').should('contain', 'Add Bill');
    });

    it('Muestra datos de facturas en la tabla', () => {
        goToMyBills();
        cy.get('#bill-name-1').should('contain', 'Test Bill');
        cy.get('#bill-name-2').should('contain', 'Test Bill 2');
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

function mockBillsData() {
    cy.fixture('billMock.json').then((response) => {
        cy.intercept('GET', '/api/v1/bills', {
            statusCode: 200,
            body: response,
        });
    });
}

function goToMyBills() {
    mockUserData();
    mockBillsData();
    cy.getTopNavItemByText('My bills').click();
}
