/// <reference types="Cypress" />
/// <reference types="../support" />

// @ts-ignore
context("Email verification", () => {

  let alreadyUsedLink = ''

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearIndexedDB();
    cy.visit(Cypress.config().baseUrl!);
  });

  it("should show verification email required message", () => {
    const randomEmail = `testEmail${Math.floor(Math.random() * 1000)}@email.com`.toLocaleLowerCase();
    cy.window().its('store').invoke('dispatch', {
      type: 'signup/start', payload: {
        email: randomEmail,
        password: 'Aa1%sfesfsf',
        repeatPassword: 'Aa1%sfesfsf',
        role: 'endUser',
        devOpsMaturity: 'veryImmature',
      }
    });
    cy.get('body').should('contain.translationOf', 'signup.verificationRequired.message');
  });

  it("should resend verification email correctly", () => {
    const randomEmail = `testEmail${Math.floor(Math.random() * 1000)}@email.com`.toLocaleLowerCase();
    cy.window().its('store').invoke('dispatch', {
      type: 'signup/start', payload: {
        email: randomEmail,
        password: 'Aa1%sfesfsf',
        repeatPassword: 'Aa1%sfesfsf',
        role: 'endUser',
        devOpsMaturity: 'veryImmature',
      }
    });
    cy.containsTranslationOf('signup.verificationRequired.resend').click();
    cy.get('body').should('contain.translationOf', 'signup.verificationRequired.resendSuccess');
  });

  it("should verify email correctly", () => {
    const randomEmail = `testEmail${Math.floor(Math.random() * 1000)}@email.com`.toLocaleLowerCase();
    cy.window().its('store').invoke('dispatch', {
      type: 'signup/start', payload: {
        email: randomEmail,
        password: 'Aa1%sfesfsf',
        repeatPassword: 'Aa1%sfesfsf',
        role: 'endUser',
        devOpsMaturity: 'veryImmature',
      }
    });
    cy.containsTranslationOf('signup.verificationRequired.message')
    cy.intercept('**/setAccountInfo?**').as('verify');
    cy.getEmailVerificationLink(randomEmail).then(url => {
      const path = `/verify-email?${url.split('?')[1]}`
      cy.visit(path);
      cy.wait('@verify').its('response.body').should('deep.include', {email: randomEmail, emailVerified: true})
      alreadyUsedLink = path;
    });
  });

  it("should show invalid code error on link reuse", () => {
    cy.visit(alreadyUsedLink);
    cy.get('body').should('contain.translationOf', 'auth.errors.auth/invalid-action-code')
  });

  it("should show invalid code error on wrong params", () => {
    cy.visit('/verify-email?oobCode=noCode');
    cy.get('body').should('contain.translationOf', 'auth.errors.auth/invalid-action-code')
  });

});
