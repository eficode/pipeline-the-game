/// <reference types="Cypress" />

// @ts-ignore
Cypress.Commands.add("containsTranslationOf", {prevSubject: 'optional'}, (subject, first: string, second: string |object, params?:object) => {
  let selector = (second && typeof second ==='string') ? first : undefined;
  let key = selector ? second : first;
  let actualParams = selector ? params : second;
  cy.window({log: false}).then((win) => {
    const translatedText = (win as any).i18n.t(key, actualParams);
    const args = [translatedText];
    if (selector) {
      args.unshift(selector);
    }
    if (subject) {
      cy.wrap(subject, {log: false}).contains(...(args as [string, string]));
    } else {
      cy.contains(...(args as [string, string]));
    }
  });
});


Cypress.Commands.add('fastSignup', (email: string, password: string) => {
  cy.window({log: false}).its('store').invoke('dispatch', {
    type: 'signup/start', payload: {
      firstName: 'John',
      lastName: 'Doe',
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
  cy.wait('@getUser', {log: false});
  // todo improve end login assertion
  return cy.location('pathname', {timeout: 20000}).should('not.equal', '/login');

});

