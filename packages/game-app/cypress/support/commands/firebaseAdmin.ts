/// <reference types="Cypress" />
import firebase from "firebase/app";

// @ts-ignore
Cypress.Commands.add('getFirebaseUserByEmail', (email: string) => {
  return cy.task('getFirebaseUserByEmail', {email});
});


Cypress.Commands.add('getFirestoreDocument', (path: string) => {
  return cy.task('getFirestoreDocument', {path});
});

Cypress.Commands.add('queryFirestore', (collection: string, data: { field: string; condition: firebase.firestore.WhereFilterOp; value: any; }) => {
  return cy.task('queryFirestore', {collection, data});
});

Cypress.Commands.add('getEmailVerificationLink', (email: string) => {
  return cy.task('getEmailVerificationLink', {email});
});

Cypress.Commands.add('initializeUser', (options: { email?: string; password?: string; emailVerified?: boolean; }) => {
  return cy.task('initializeUser', options);
});

Cypress.Commands.add('initializeGame', (options: { facilitatorId: string; }) => {
  return cy.task('initializeGame', options);
});


Cypress.Commands.add('getRestPasswordLink', (email: string) => {
  return cy.task('getRestPasswordLink', {email});
});
