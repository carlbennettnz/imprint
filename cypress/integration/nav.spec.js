/// <reference types="Cypress" />

context('Nav', () => {
  it('redircts to /lessons/1 from root', () => {
    cy.visit('/')
    cy.location('pathname').should('equal', '/lessons/1')
  })

  it('redircts to /lessons/1 from /lessons', () => {
    cy.visit('/lessons')
    cy.location('pathname').should('equal', '/lessons/1')
  })

  it('links from one lesson all others', () => {
    cy.visit('/lessons/1')
    cy.get(`a[href='/lessons/2/quiz']`).click()
    cy.location('pathname').should('equal', '/lessons/2/quiz')
  })
})
