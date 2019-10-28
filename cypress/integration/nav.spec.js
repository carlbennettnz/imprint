/// <reference types="Cypress" />

context('Nav', () => {
  before(() => {
    cy.on('window:before:load', win => {
      win.resetDb = true
    })
  })

  it('redircts to /lessons/1 from /lessons', () => {
    cy.visit('/lessons')
    cy.location('pathname').should('equal', '/lessons/1')
  })

  it('links from one lesson all others', () => {
    cy.visit('/lessons/1')
    cy.get(`a[href='/lessons/2']`).click()
    cy.location('pathname').should('equal', '/lessons/2')
  })

  it('links to lesson editor', () => {
    cy.visit('/lessons/1')
    cy.get(`a[href='/lessons/1/edit']`).click()
    cy.location('pathname').should('equal', '/lessons/1/edit')
  })

  it('links from lesson editor back to lesson', () => {
    cy.visit('/lessons/1/edit')
    cy.get(`header > a[href='/lessons/1']`)
      .eq(0)
      .click()
    cy.location('pathname').should('equal', '/lessons/1')
  })
})
