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
     * @param keyOrSelector selector if you want to specify one, or translation key
     * @param keyOrParams only if you specify selector as a first argument or as params
     * @param params
     */
    containsTranslationOf(keyOrSelector:string, keyOrParams?:  | object, params?:object): Chainable<Subject>;

    drag: (position: { x: number; y: number }) => Chainable;

    /**
     * Signup to the web application without filling the form
     */
    fastSignup(email: string, password: string): Chainable<Subject>;

    /**
     * Login to the web application without filling the form
     */
    fastLogin(email: string, password: string): Chainable<Subject>;

    /**
     * Insert value in input without typing effect and delay.
     * Much faster than type
     */
    fill(value: string): Chainable<Subject>;

    /**
     * Get element by html id selector or data-cy selector
     */
    getElementById(id: string, options?: Parameters<typeof cy.get>[1]): Chainable<JQuery<HTMLElement>>;
    /**
     * Set up a new game choosing a random scenario
     */
    initializeGame(options: { facilitatorId: string; }): Chainable<any>;
    /**
     * Set un a new user with the provided info (both in auth and firestore)
     * Optional values are generated randomly.
     */
    initializeUser(options: { email?: string; password?: string; emailVerified?: boolean; }): Chainable<any>;

    getInputByName(name: string, options?: Parameters<typeof cy.get>[1]): Chainable<JQuery<HTMLInputElement>>;
    getFirebaseUserByEmail(email: string): Chainable<any>;
    getFirestoreDocument(path: string): Chainable<any>;
    getEmailVerificationLink(email: string): Chainable<any>;
    queryFirestore(collection: string, data: { field: string; condition: import("firebase").default.firestore.WhereFilterOp; value: any; });
  }

  /**
   * Type Augmentation for custom should assertion
   */
  interface Chainer<Subject> {
    (chainer: 'contain.translationOf', key: string): Chainable<Subject>
    (chainer: 'not.contain.translationOf', key: string): Chainable<Subject>
  }
}
