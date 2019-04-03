/// <reference types="Cypress" />

context('Title', () => {
  it('has the correct title', () => {
    cy.visit('/')

    cy.get('h1')
      .should('have.text', 'Imprint')
  })
})
