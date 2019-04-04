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

  it('shows a new item after pressing return on feedback screen', () => {
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-pinyin]').should('have.text', 'nǐ')
    cy.get('[data-test-characters]').should('have.text', '你')
  })
})
