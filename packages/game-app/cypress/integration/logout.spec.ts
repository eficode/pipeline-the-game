/// <reference types="Cypress" />
/// <reference types="../support" />

// @ts-ignore
import {generateRandomCredentials} from "./utils/generators";

context("Logout", () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearIndexedDB();
    cy.visit('/login');
  });

  it("should logout from the email verification required page", () => {
    const {email, password} = generateRandomCredentials()
    cy.initializeUser({email: email, password: password}).then(user => {
      cy.fastLogin(email, password);
      cy.containsTranslationOf('auth.logout').click();
      cy.location('pathname').should('equal', '/signup');
    });
  })

  it("should logout from the dashboard", () => {
    const {email, password} = generateRandomCredentials()
    cy.initializeUser({email: email, password: password, emailVerified: true}).then(user => {
      cy.fastLogin(email, password);
      cy.containsTranslationOf('auth.logout').click();
      cy.location('pathname').should('equal', '/signup');
    });
  })

});
