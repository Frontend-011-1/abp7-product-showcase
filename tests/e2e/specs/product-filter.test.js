// A veces cuando se usa por primera vez Cypress puede que les de un error. Para solucionarlo tienen que correr (estando dentro de la carpeta del proyecto) el comando npm exec cypress install

describe('Product Filter', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/products*', {
      statusCode: 200,
      fixture: 'productos.json',
    }).as('getProducts');
  });

  it('filter and shows products by category', () => {
    cy.visit('/');

    cy.wait('@getProducts');

    cy.get('[data-cy="category-filter"]').click();
    cy.contains('women').click(); // selecciona filtro de categoria mujeres

    cy.get('[data-cy="product-card"]')
      .should('be.visible')
      .and('have.length', 2);

    cy.get('[data-cy="product-card"]').should('contain', 'Long sleeve Jacket');
  });
});
