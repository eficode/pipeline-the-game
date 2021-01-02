/// <reference types="Cypress" />
/// <reference types="../support" />

// @ts-ignore
context("Email verification", () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearIndexedDB();
    cy.visit(Cypress.config().baseUrl!);
  });

  it("should show verification email required message", () => {
    const randomEmail = `testEmail${Math.floor(Math.random() * 1000)}@email.com`.toLocaleLowerCase();
    cy.window().its('store').invoke('dispatch', {
      type: 'signup/start', payload: {
        email:randomEmail,
        password:'Aa1%sfesfsf',
        repeatPassword:'Aa1%sfesfsf',
        role:'endUser',
        devOpsMaturity:'veryImmature',
      }
    });
    cy.get('body').should('contain.translationOf', 'signup.verificationRequired.message');
  });

  it("should resend verification email correctly", () => {
    const randomEmail = `testEmail${Math.floor(Math.random() * 1000)}@email.com`.toLocaleLowerCase();
    cy.window().its('store').invoke('dispatch', {
      type: 'signup/start', payload: {
        email:randomEmail,
        password:'Aa1%sfesfsf',
        repeatPassword:'Aa1%sfesfsf',
        role:'endUser',
        devOpsMaturity:'veryImmature',
      }
    });
    cy.containsTranslationOf('signup.verificationRequired.resend').click();
    cy.get('body').should('contain.translationOf', 'signup.verificationRequired.resendSuccess');
  });

});
