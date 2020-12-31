/// <reference types="Cypress" />
/// <reference types="../support" />

// @ts-ignore
context("Signup", () => {

  const usedEmails: string[] = [];

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl!);
  });

  // TODO test for all required fields
  it("should show invalid email error message", () => {
    cy.getInputByName('email').fill('non-valid-email');
    cy.get('button').click();
    cy.get('body').should('contain.translationOf', 'signup.errors.invalidEmail')
  });

  it("should show invalid password error", () => {
    cy.getInputByName('password').fill('123456789');
    cy.get('button').click();
    cy.get('body').should('contain.translationOf', 'signup.errors.passwordRequirements')
  });

  it("should not show invalid password error for correct password", () => {
    cy.getInputByName('password').fill('Aa1%sfesfsf');
    cy.get('button').click();
    cy.get('body').should('not.contain.translationOf', 'signup.errors.passwordRequirements')
  });

  it("should show mismatch password error", () => {
    cy.getInputByName('password').fill('123456789');
    cy.getInputByName('repeatPassword').fill('123456788');
    cy.get('button').click();
    cy.get('body').should('contain.translationOf', 'signup.errors.passwordMatch')
  });

  it("should signup correctly", () => {
    const randomEmail = `testEmail${Math.floor(Math.random() * 1000)}@email.com`.toLocaleLowerCase();
    usedEmails.push(randomEmail);
    cy.getInputByName('email').fill(randomEmail);
    cy.getInputByName('password').fill('Aa1%sfesfsf');
    cy.getInputByName('repeatPassword').fill('Aa1%sfesfsf');
    cy.getInputByName('role').select('endUser');
    cy.getInputByName('devOpsMaturity').select('veryImmature');
    cy.get('button').click();
    cy.get('body').should('contain', 'Loading');
    cy.get('body').should('contain', 'Success');

    // check auth presence
    cy.getFirebaseUserByEmail(randomEmail).should('deep.include', {
      email: randomEmail,
      emailVerified: false,
      disabled: false
    }).its('uid').then(uid => {
      // check firestore data
      cy.getFirestoreDocument(`users/${uid}`).should('deep.eq', {
        devOpsMaturity: 'veryImmature',
        role: 'endUser',
        email: randomEmail
      });
    });
  });

  it("should show email already used error", () => {
    const alreadyUsedEmail = usedEmails[0];
    cy.getInputByName('email').fill(alreadyUsedEmail);
    cy.getInputByName('password').fill('Aa1%sfesfsf');
    cy.getInputByName('repeatPassword').fill('Aa1%sfesfsf');
    cy.getInputByName('role').select('endUser');
    cy.getInputByName('devOpsMaturity').select('veryImmature');
    cy.get('button').click();
    cy.get('body').should('contain.translationOf', 'signup.errors.auth/email-already-in-use');
  });

});
