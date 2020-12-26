/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    containsTranslation(key: string): Chainable<Subject>;
  }
}
