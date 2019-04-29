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
})

const matchLessonItem = (index, expected) => {
  const tds = () =>
    cy
      .get('tr')
      .eq(index)
      .children('td')

  tds()
    .eq(0)
    .should('have.text', expected.characters)

  tds()
    .eq(1)
    .should('have.text', expected.pinyin)

  tds()
    .eq(2)
    .should('have.text', expected.meaning)
}
