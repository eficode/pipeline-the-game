/// <reference types="Cypress" />

// @ts-ignore
Cypress.Commands.add("containsTranslationOf", {prevSubject: 'optional'}, (subject, key: string) => {
  cy.window({log: false}).then((win) => {
    if (subject) {
      cy.wrap(subject, {log: false}).contains((win as any).i18n.t(key));
    } else {
      cy.contains((win as any).i18n.t(key));
    }
  });
});


Cypress.Commands.add('fastSignup', (email: string, password: string) => {
  cy.window({log: false}).its('store').invoke('dispatch', {
    type: 'signup/start', payload: {
      email: email,
      password: password,
      repeatPassword: password,
      role: 'endUser',
      devOpsMaturity: 'veryImmature',
    }
  });
});

Cypress.Commands.add('fastLogin', (email: string, password: string) => {
  Cypress.log({
    name: 'fastLogin',
    consoleProps: () => {
      return {
        email, password
      }
    }
  })
  cy.intercept('**/getAccountInfo?**').as('getUser');
  cy.window({log: false}).its('store', {log: false}).invoke('dispatch', {
    type: 'auth/login', payload: {
      email: email,
      password: password
    }
  }, {log: false});
});

