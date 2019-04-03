/// <reference types="Cypress" />

context('Card', () => {
  before(() => cy.visit('/'))

  it('is shows the pinyin', () => {
    cy.get('[data-test-pinyin]').should('have.text', 'wǒ')
  })

  it('is shows the characters', () => {
    cy.get('[data-test-characters]').should('have.text', '我')
  })
})
