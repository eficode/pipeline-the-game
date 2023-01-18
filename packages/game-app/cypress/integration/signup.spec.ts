/// <reference types="Cypress" />
/// <reference types="../support" />

// @ts-ignore
import { generateRandomCredentials } from './utils/generators';

context('Signup', () => {
  const usedEmails: string[] = [];

  beforeEach(() => {
    cy.viewport(1200, 700);
    cy.clearLocalStorage();
    cy.clearIndexedDB();
    cy.visit('/signup');
  });

  // TODO test for all required fields
  it('should show invalid email error message', () => {
    cy.getInputByName('email').fill('non-valid-email');
    cy.containsTranslationOf('input', 'signup.form.inputText').click();
    cy.get('body').should('contain.translationOf', 'auth.errors.invalidEmail');
  });

  it('should show invalid password error', () => {
    cy.getInputByName('password').fill('123456789');
    cy.containsTranslationOf('input', 'signup.form.inputText').click();
    cy.get('body').should('contain.translationOf', 'auth.errors.passwordRequirements');
  });

  it('should not show invalid password error for correct password', () => {
    cy.getInputByName('password').fill('Aa1sfesfsf');
    cy.containsTranslationOf('input', 'signup.form.inputText').click();
    cy.get('body').should('not.contain.translationOf', 'auth.errors.passwordRequirements');
  });

  it('should show mismatch password error', () => {
    cy.getInputByName('password').fill('123456789');
    cy.getInputByName('repeatPassword').fill('123456788');
    cy.containsTranslationOf('input', 'signup.form.inputText').click();
    cy.get('body').should('contain.translationOf', 'auth.errors.passwordMatch');
  });

  it('should signup correctly and go to email verification required', () => {
    const { email, password } = generateRandomCredentials();
    usedEmails.push(email);
    cy.getInputByName('firstName').fill('John');
    cy.getInputByName('lastName').fill('Doe');
    cy.getInputByName('email').fill(email);
    cy.getInputByName('password').fill(password);
    cy.getInputByName('repeatPassword').fill(password);
    cy.getInputByName('role').select('endUser');
    cy.getInputByName('devOpsMaturity').select('veryImmature');
    cy.containsTranslationOf('input', 'signup.form.inputText').click();
    cy.get('body').should('contain.translationOf', 'signup.verificationRequired.title');

    // check auth presence
    cy.getFirebaseUserByEmail(email)
      .should('deep.include', {
        email: email,
        emailVerified: false,
        disabled: false,
      })
      .its('uid')
      .then(uid => {
        // check firestore data
        cy.getFirestoreDocument(`users/${uid}`).should('contain', {
          firstName:'John',
          lastName:'Doe',
          devOpsMaturity: 'veryImmature',
          role: 'endUser',
          email: email,
        });
      });
  });

  it('should signup correctly and go to email verification required if email contains capital letters', () => {
    const { email, password } = generateRandomCredentials();
    const emailWithCapitalLetters = email.charAt(0).toUpperCase() + email.slice(1);
    usedEmails.push(email);
    cy.getInputByName('firstName').fill('John');
    cy.getInputByName('lastName').fill('Doe');
    cy.getInputByName('email').fill(emailWithCapitalLetters);
    cy.getInputByName('password').fill(password);
    cy.getInputByName('repeatPassword').fill(password);
    cy.getInputByName('role').select('endUser');
    cy.getInputByName('devOpsMaturity').select('veryImmature');
    cy.containsTranslationOf('input', 'signup.form.inputText').click();
    cy.get('body').should('contain.translationOf', 'signup.verificationRequired.title');

    // check auth presence
    cy.getFirebaseUserByEmail(email)
      .should('deep.include', {
        email: email,
        emailVerified: false,
        disabled: false,
      })
      .its('uid')
      .then(uid => {
        // check firestore data
        cy.getFirestoreDocument(`users/${uid}`).should('contain', {
          firstName:'John',
          lastName:'Doe',
          devOpsMaturity: 'veryImmature',
          role: 'endUser',
          email: email,
        });
      });
  });

  it('should show email already used error', () => {
    const { email, password } = generateRandomCredentials();
    cy.initializeUser({ email });
    const alreadyUsedEmail = email;
    cy.getInputByName('firstName').fill('John');
    cy.getInputByName('lastName').fill('Doe');
    cy.getInputByName('email').fill(alreadyUsedEmail);
    cy.getInputByName('password').fill(password);
    cy.getInputByName('repeatPassword').fill(password);
    cy.getInputByName('role').select('endUser');
    cy.getInputByName('devOpsMaturity').select('veryImmature');
    cy.containsTranslationOf('input', 'signup.form.inputText').click();
    cy.get('body').should('contain.translationOf', 'auth.errors.auth/email-already-in-use');
  });
});
