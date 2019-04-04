/// <reference types="Cypress" />

context('Quiz', () => {
  beforeEach(() => cy.visit('/'))

  it('it shows the correct answer if wrong answer is entered', () => {
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('[data-test-feedback]').should('have.text', 'I, me, myself')
  })

  it('it hides the input after submitting the wrong answer', () => {
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('[data-test-quiz-input]').should('not.exist')
  })
})
