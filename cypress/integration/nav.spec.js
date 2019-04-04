/// <reference types="Cypress" />

context('Nav', () => {
  it('links from lesson list to lesson', () => {
    cy.visit('/')
    cy.get(`a[href='/lesson-1']`).click()
    cy.location('pathname').should('equal', '/lesson-1')
  })

  it('links from lesson to lesson list', () => {
    cy.visit('/lesson-1')
    cy.get(`a[href='/']`).click()
    cy.location('pathname').should('equal', '/')
  })

  it('loads the correct quiz', () => {
    cy.visit('/lesson-2')
    cy.get('h2').should('have.text', 'Lesson 2')
  })
})
