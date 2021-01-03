/// <reference types="Cypress" />
/// <reference types="Chai" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     *
     * Like contains, retrieves the element that contain the translation of the provided key
     *
     * @param key the translation key
     */
    containsTranslationOf(key: string): Chainable<Subject>;

    getInputByName(name: string, options?: Parameters<typeof cy.get>[1]): Chainable<JQuery<HTMLInputElement>>;

    getFirebaseUserByEmail(email: string): Chainable<any>;

    getFirestoreDocument(path: string): Chainable<any>;
    /**
     * Delete all data in the indexedDB, useful for example to delete all
     * firebase authentication persisted data
     */
    clearIndexedDB(): Chainable<any>;

    /**
     * Insert value in input without typing effect and delay.
     * Much faster than type
     * @param {string} value
     */
    fill(value: string): Chainable<Subject>;
  }

  /**
   * Type Augmentation for custom should assertion
   */
  interface Chainer<Subject> {
    (chainer: 'contain.translationOf', key: string): Chainable<Subject>
    (chainer: 'not.contain.translationOf', key: string): Chainable<Subject>
  }
}
