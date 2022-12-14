describe('App title', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.title().should('equal', 'MovieAppFrontend');
  });

  it('Visits the register page', () => {
    cy.visit('/register');
    cy.get('#email').type('admin@gmail.com');
    cy.get('#name').type('Admin');
    cy.get('#pass').type('pass123');
    cy.get('#confirmPass').type('pass123');
    cy.visit('/login');
  });

  it('Visits the login page', () => {
    cy.get('#email').type('admin@gmail.com');
    cy.get('#pass').type('Admin');
    cy.visit('/home');
  })

  it('click on movie & visits the movie page', () => {
    cy.get('[data-testid="movie-card"]').first().click();
  })

  it('change theme', () => {
    cy.get('[data-testid="darkMode"]').click();
  })

  it('search movie', () => {
    cy.get('[data-testid="search"]').type('black').type('{enter}');
  })

  it('sort movie by name', () => {
    cy.get('mat-select').first().click()
    cy.get('.mat-option')
      .contains('By Name').click();
  })

  it('sort movie by date', () => {
    cy.get('mat-select').first().click()
    cy.get('.mat-option')
      .contains('By Date').click();
    cy.visit('/');
  })
})
