/// <reference types="Cypress" />

context('Lesson', () => {
  it('has the correct title', () => {
    cy.visit('/lessons/1')
    cy.get('h2').should('have.text', 'Lesson 1: How are you?')
  })

  it('lists the lessons contents', () => {
    cy.visit('/lessons/1')
    matchLessonItem(0, { characters: '我', pinyin: 'wǒ', meaning: 'I, me, myself' })
    matchLessonItem(1, { characters: '你', pinyin: 'nǐ', meaning: 'you' })
    cy.get('tr').should('have.length', 2)
  })

  it('disables the inputs in read mode', () => {
    cy.visit('/lessons/1')
    cy.get('table input').each(input => cy.wrap(input).should('be.disabled'))
  })

  it('does not disable the inputs in edit mode', () => {
    cy.visit('/lessons/1/edit')
    cy.get('table input').each(input => cy.wrap(input).should('not.be.disabled'))
  })

  it('does not persist changes if save button is not clicked', () => {
    cy.visit('/lessons/1/edit')
    cy.get('table input')
      .eq(0)
      .type('他')
    cy.visit('/lessons/1')
    cy.get('table input')
      .eq(0)
      .should('have.value', '我')
  })
})

const matchLessonItem = (index, expected) => {
  const tds = () =>
    cy
      .get('tr')
      .eq(index)
      .children('td')

  tds()
    .eq(0)
    .children('input')
    .should('have.value', expected.characters)

  tds()
    .eq(1)
    .children('input')
    .should('have.value', expected.pinyin)

  tds()
    .eq(2)
    .children('input')
    .should('have.value', expected.meaning)
}
