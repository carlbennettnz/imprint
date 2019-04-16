/// <reference types="Cypress" />

context('Card', () => {
  before(() => cy.visit('/lessons/1/quiz'))

  it('it shows the pinyin', () => {
    cy.get('[data-test-pinyin]').should('have.text', 'wǒ')
  })

  it('it shows the characters', () => {
    cy.get('[data-test-characters]').should('have.text', '我')
  })
})
