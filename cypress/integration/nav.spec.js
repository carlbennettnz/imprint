/// <reference types="Cypress" />

context('Nav', () => {
  before(() => cy.visit('/'))

  it('links from lesson list to lesson', () => {
    cy.get(`a[href='/lesson-1']`).click()
    cy.location('pathname').should('equal', '/lesson-1')
  })

  it('links from lesson to lesson list', () => {
    cy.get(`a[href='/']`).click()
    cy.location('pathname').should('equal', '/')
  })
})
