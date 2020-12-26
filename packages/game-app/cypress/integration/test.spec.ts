/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />

context("Index page", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
  });

  it("should contain the title", () => {
    cy.containsTranslation("home.title");
  });
});
