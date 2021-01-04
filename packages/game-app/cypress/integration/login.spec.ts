/// <reference types="Cypress" />
/// <reference types="../support" />

// @ts-ignore
context("Login", () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearIndexedDB();
    cy.visit('/login');
  });

  it("should show error on user not present", () => {
    const randomEmail = `testEmail${Math.floor(Math.random() * 1000)}@email.com`.toLocaleLowerCase();
    cy.getInputByName('email').fill(randomEmail);
    cy.getInputByName('password').fill('anypassword');
    cy.get('button').containsTranslationOf('login.form.buttonText').click();
    cy.get('body').should('contain.translationOf', 'login.errors.auth/user-not-found');
  });

  it("should show error on invalid password", () => {
    cy.initializeUser({password: 'aA1uuuuuuu'}).then(user => {
      cy.getInputByName('email').fill(user.email);
      cy.getInputByName('password').fill('anypassword');
      cy.get('button').containsTranslationOf('login.form.buttonText').click();
      cy.get('body').should('contain.translationOf', 'login.errors.auth/wrong-password');
    });
  });


  it("should login correctly and go to dashboard", () => {
    cy.initializeUser({password: 'aA1aaaaaaa', emailVerified: true}).then(user => {
      cy.getInputByName('email').fill(user.email);
      cy.getInputByName('password').fill('aA1aaaaaaa');
      cy.get('button').containsTranslationOf('login.form.buttonText').click();
      cy.location('pathname').should('equal', '/dashboard');
    });
  });

  it("should login correctly and go to email verification required", () => {
    cy.initializeUser({password: 'aA1aaaaaaa', emailVerified: false}).then(user => {
      cy.getInputByName('email').fill(user.email);
      cy.getInputByName('password').fill('aA1aaaaaaa');
      cy.get('button').containsTranslationOf('login.form.buttonText').click();
      cy.location('pathname').should('equal', '/email-verification-required');
    });
  });

});
