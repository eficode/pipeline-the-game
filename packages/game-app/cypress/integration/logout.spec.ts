/// <reference types="Cypress" />
/// <reference types="../support" />

// @ts-ignore
import { generateRandomCredentials } from './utils/generators';

context('Logout', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearIndexedDB();
    cy.visit('/login');
  });

  it('should logout from the Email Verification Required page and be sent to Login', () => {
    const { email, password } = generateRandomCredentials();
    cy.initializeUser({ email: email, password: password }).then(user => {
      cy.fastLogin(email, password);
      cy.containsTranslationOf('auth.logout').click();
      cy.location('pathname').should('equal', '/login');
    });
  });

  it('should logout from the Dashboard and be sent to Login', () => {
    const { email, password } = generateRandomCredentials();
    cy.initializeUser({ email: email, password: password, emailVerified: true }).then(user => {
      cy.fastLogin(email, password);
      cy.containsTranslationOf('auth.logout').click();
      cy.location('pathname').should('equal', '/login');
    });
  });
});
