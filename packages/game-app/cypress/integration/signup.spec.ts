/// <reference types="Cypress" />
/// <reference types="../support" />

// @ts-ignore
import {generateRandomCredentials} from "./utils/generators";

context("Signup", () => {

  const usedEmails: string[] = [];

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearIndexedDB();
    cy.visit(Cypress.config().baseUrl!);
  });

  // TODO test for all required fields
  it("should show invalid email error message", () => {
    cy.getInputByName('email').fill('non-valid-email');
    cy.get('button').containsTranslationOf('signup.form.buttonText').click();
    cy.get('body').should('contain.translationOf', 'signup.errors.invalidEmail')
  });

  it("should show invalid password error", () => {
    cy.getInputByName('password').fill('123456789');
    cy.get('button').containsTranslationOf('signup.form.buttonText').click();
    cy.get('body').should('contain.translationOf', 'signup.errors.passwordRequirements')
  });

  it("should not show invalid password error for correct password", () => {
    cy.getInputByName('password').fill('Aa1sfesfsf');
    cy.get('button').containsTranslationOf('signup.form.buttonText').click();
    cy.get('body').should('not.contain.translationOf', 'signup.errors.passwordRequirements')
  });

  it("should show mismatch password error", () => {
    cy.getInputByName('password').fill('123456789');
    cy.getInputByName('repeatPassword').fill('123456788');
    cy.get('button').containsTranslationOf('signup.form.buttonText').click();
    cy.get('body').should('contain.translationOf', 'signup.errors.passwordMatch')
  });

  it("should signup correctly and go to email verification required", () => {
    const {email, password} = generateRandomCredentials()
    usedEmails.push(email);
    cy.getInputByName('email').fill(email);
    cy.getInputByName('password').fill(password);
    cy.getInputByName('repeatPassword').fill(password);
    cy.getInputByName('role').select('endUser');
    cy.getInputByName('devOpsMaturity').select('veryImmature');
    cy.get('button').containsTranslationOf('signup.form.buttonText').click();
    cy.location("pathname").should("equal", "/email-verification-required");

    // check auth presence
    cy.getFirebaseUserByEmail(email).should('deep.include', {
      email: email,
      emailVerified: false,
      disabled: false
    }).its('uid').then(uid => {
      // check firestore data
      cy.getFirestoreDocument(`users/${uid}`).should('deep.eq', {
        devOpsMaturity: 'veryImmature',
        role: 'endUser',
        email: email
      });
    });
  });

  it("should show email already used error", () => {
    const {email, password} = generateRandomCredentials()
    cy.initializeUser({email})
    const alreadyUsedEmail = email;
    cy.getInputByName('email').fill(alreadyUsedEmail);
    cy.getInputByName('password').fill(password);
    cy.getInputByName('repeatPassword').fill(password);
    cy.getInputByName('role').select('endUser');
    cy.getInputByName('devOpsMaturity').select('veryImmature');
    cy.get('button').containsTranslationOf('signup.form.buttonText').click();
    cy.get('body').should('contain.translationOf', 'signup.errors.auth/email-already-in-use');
  });

});
