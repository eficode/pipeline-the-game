/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    containsTranslation(key: string): Chainable<Subject>;
    getInputByName(name: string, options?: Parameters<typeof cy.get>[1]): Chainable<JQuery<HTMLInputElement>>;
  }
}
