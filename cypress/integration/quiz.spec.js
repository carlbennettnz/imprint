/// <reference types="Cypress" />

context('Quiz', () => {
  beforeEach(() => cy.visit('/lesson-1'))

  it('shows the correct answer if wrong answer is entered', () => {
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('[data-test-feedback]').should('have.text', 'I, me, myself')
  })

  it('hides the input after submitting the wrong answer', () => {
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('[data-test-quiz-input]').should('not.exist')
  })

  it('says if the correct answer is entered', () => {
    cy.get('[data-test-quiz-input]').type('I')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('[data-test-feedback]').should('have.text', 'Correct!')
  })

  it('does not care about the case of the answer', () => {
    cy.get('[data-test-quiz-input]').type('i')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('[data-test-feedback]').should('have.text', 'Correct!')
  })

  it('does not care about whitespace around the answer', () => {
    cy.get('[data-test-quiz-input]').type(' I ')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('[data-test-feedback]').should('have.text', 'Correct!')
  })

  it('shows a new item after pressing return on feedback screen', () => {
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-pinyin]').should('have.text', 'nǐ')
    cy.get('[data-test-characters]').should('have.text', '你')
  })

  it('focuses the input automatically', () => {
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.focused().should('have.attr', 'data-test-quiz-input')
  })

  it('loops', () => {
    cy.get('[data-test-quiz-input]').type('wrong')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-quiz-input]').type('wrong')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-pinyin]').should('have.text', 'wǒ')
    cy.get('[data-test-characters]').should('have.text', '我')
  })

  it('completes if you get everything correct', () => {
    cy.get('[data-test-quiz-input]').type('I')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('[data-test-feedback]').should('have.text', 'Lesson complete!')
    cy.get('[data-test-instruction]').should(
      'have.text',
      'Press enter to return to the lesson list'
    )
  })

  it('makes you answer correctly twice if you mess up', () => {
    cy.get('[data-test-quiz-input]').type('wrong')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-quiz-input]').type('wrong')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-quiz-input]').type('I')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-quiz-input]').type('I')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('[data-test-feedback]').should('have.text', 'Lesson complete!')
    cy.get('[data-test-instruction]').should(
      'have.text',
      'Press enter to return to the lesson list'
    )
  })

  it('does not show you items again after you complete them', () => {
    cy.get('[data-test-quiz-input]').type('I')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-quiz-input]').type('wrong')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-pinyin]').should('have.text', 'nǐ')
  })

  it('takes you back to the list after completing and pressing enter', () => {
    cy.get('[data-test-quiz-input]').type('I')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.location('pathname').should('equal', '/')
  })

  it('lets you start again after completing', () => {
    cy.get('[data-test-quiz-input]').type('I')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-quiz-input]').type('you')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('li:first-of-type > a').click()
    cy.get('[data-test-quiz-input]').type('I')
    cy.get('[data-test-quiz-form]').submit()
    cy.get('body').type('{enter}')
    cy.get('[data-test-pinyin]').should('have.text', 'nǐ')
    cy.get('[data-test-characters]').should('have.text', '你')
  })
})
