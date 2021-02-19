/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />
import 'firebase/auth';
import firebase from 'firebase/app';

context('Routing', () => {
  beforeEach(() => {
    cy.viewport(1200, 700);
    cy.clearLocalStorage();
    cy.clearIndexedDB();
    cy.visit(Cypress.config().baseUrl!);
  });

  it('should show Login page when visiting base url', () => {
    cy.location('pathname').should('equal', '/login');
  });

  it('should be redirected from Dashboard to Login if not authenticated', () => {
    cy.visit('/dashboard');
    cy.location('pathname').should('equal', '/login');
  });

  it('should show Login page', () => {
    cy.visit('/login');
    cy.location('pathname').should('equal', '/login');
  });

  it('should show Signup page', () => {
    cy.visit('/signup');
    cy.location('pathname').should('equal', '/signup');
  });

  it('should redirect non-matching URLs to Login', () => {
    cy.visit('/not-available-url');
    cy.location('pathname').should('equal', '/login');
  });
});
