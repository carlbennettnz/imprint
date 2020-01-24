/// <reference types="Cypress" />

context.skip('Title', () => {
  before(() => {
    cy.on('window:before:load', win => {
      win.resetDb = true
    })
  })

  it('has the correct title', () => {
    cy.visit('/')

    cy.get('h1').should('have.text', 'Imprint')
  })
})
