/// <reference types="Cypress" />

// @ts-ignore
Cypress.Commands.add('getFirebaseUserByEmail', (email: string) => {
  return cy.task('getFirebaseUserByEmail', {email});
});


Cypress.Commands.add('getFirestoreDocument', (path: string) => {
  return cy.task('getFirestoreDocument', {path});
});

Cypress.Commands.add('getEmailVerificationLink', (email: string) => {
  return cy.task('getEmailVerificationLink', {email});
});

Cypress.Commands.add('initializeUser', (options: { email?: string; password?: string; emailVerified?: boolean; }) => {
  return cy.task('initializeUser', options);
});
