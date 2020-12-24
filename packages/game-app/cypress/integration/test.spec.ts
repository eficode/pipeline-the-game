/// <reference types="cypress" />

context('Index page', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
  })

  it('should contain the title', () => {
   cy.contains('Pipeline - The Game that Delivers!')
  })
})
