// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
/// <reference types="Cypress" />

Cypress.Commands.add("containsTranslation", (key: string) => {
  return cy.window().then((win) => {
    return cy.contains((win as any).i18n.t(key));
  });
});

Cypress.Commands.add('getInputByName', (name: string, options: Parameters<typeof cy.get>[1]) => {
  cy.get(`input[name="${name}"],select[name="${name}"]`, options);
});

Cypress.Commands.add('getFirebaseUserByEmail', (email: string) => {
  return cy.task('getFirebaseUserByEmail', {email});
});


Cypress.Commands.add('getFirestoreDocument', (path: string) => {
  return cy.task('getFirestoreDocument', {path});
});

