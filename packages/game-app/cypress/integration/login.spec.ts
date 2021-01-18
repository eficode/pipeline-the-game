/// <reference types="Cypress" />
/// <reference types="../support" />
import {generateRandomCredentials, generateRandomEmail} from "./utils/generators";

// @ts-ignore
context("Login", () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearIndexedDB();
    cy.visit('/login');
  });

  it("should show error on user not present", () => {
    const randomEmail = generateRandomEmail();
    cy.getInputByName('email').fill(randomEmail);
    cy.getInputByName('password').fill('anyPassword');
    cy.containsTranslationOf('button', 'login.form.buttonText').click();
    cy.get('body').should('contain.translationOf', 'login.errors.auth/user-not-found');
  });

  it("should show error on invalid password", () => {
    const {email, password} = generateRandomCredentials()
    cy.initializeUser({email: email, password: password}).then(user => {
      cy.getInputByName('email').fill(email);
      cy.getInputByName('password').fill('invalidPassword');
      cy.containsTranslationOf('button', 'login.form.buttonText').click();
      cy.get('body').should('contain.translationOf', 'login.errors.auth/wrong-password');
    });
  });


  it("should login correctly and go to dashboard", () => {
    const {email, password} = generateRandomCredentials()
    cy.initializeUser({email, password, emailVerified: true}).then(user => {
      cy.getInputByName('email').fill(email);
      cy.getInputByName('password').fill(password);
      cy.containsTranslationOf('button', 'login.form.buttonText').click();
      cy.location('pathname').should('equal', '/dashboard');
    });
  });

  it("should login correctly and go to email verification required", () => {
    const {email, password} = generateRandomCredentials()
    cy.initializeUser({email, password, emailVerified: false}).then(user => {
      cy.getInputByName('email').fill(email);
      cy.getInputByName('password').fill(password);
      cy.containsTranslationOf('button', 'login.form.buttonText').click();
      cy.location('pathname').should('equal', '/email-verification-required');
    });
  });

});
