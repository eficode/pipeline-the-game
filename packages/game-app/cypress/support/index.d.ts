/// <reference types="Cypress" />
/// <reference types="Chai" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Delete all data in the indexedDB, useful for example to delete all
     * firebase authentication persisted data
     */
    clearIndexedDB(): Chainable<any>;
    /**
     *
     * Like contains, retrieves the element that contain the translation of the provided key
     *
     * @param key the translation key
     */
    containsTranslationOf(key: string): Chainable<Subject>;
    /**
     * Signup to the web application without filling the form
     */
    fastSignup(email:string,password:string): Chainable<Subject>;
    /**
     * Login to the web application without filling the form
     */
    fastLogin(email:string,password:string): Chainable<Subject>;
    /**
     * Insert value in input without typing effect and delay.
     * Much faster than type
     */
    fill(value: string): Chainable<Subject>;
    /**
     * Set un a new user with the provided info (both in auth and firestore)
     * Optional values are generated randomly.
     */
    initializeUser(options: { email?: string; password?: string; emailVerified?: boolean; }): Chainable<any>;
    getInputByName(name: string, options?: Parameters<typeof cy.get>[1]): Chainable<JQuery<HTMLInputElement>>;
    getFirebaseUserByEmail(email: string): Chainable<any>;
    getFirestoreDocument(path: string): Chainable<any>;
    getEmailVerificationLink(email: string): Chainable<any>;
  }

  /**
   * Type Augmentation for custom should assertion
   */
  interface Chainer<Subject> {
    (chainer: 'contain.translationOf', key: string): Chainable<Subject>
    (chainer: 'not.contain.translationOf', key: string): Chainable<Subject>
  }
}
