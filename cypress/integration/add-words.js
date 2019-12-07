/// <reference types="Cypress" />

context('Add Words', () => {
  before(() => {
    cy.on('window:before:load', win => {
      win.resetDb = true
    })

    cy.visit('/add-words')
  })

  it('displays one empty input row to begin with')
  it('shows an additional empty row once something has been entered into the first')
  it('adds miscellanous words by default')
  it('can create lessons')
  it('autoincrements the lesson number')
  it('disables the save button after it is clicked')
  it('redirects back to the dashboard after a successful save')
})
