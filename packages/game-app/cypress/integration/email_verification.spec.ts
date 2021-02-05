/// <reference types="Cypress" />
/// <reference types="../support" />
import {generateRandomCredentials} from "./utils/generators";

// @ts-ignore
context("Email verification", () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearIndexedDB();
    cy.visit(Cypress.config().baseUrl!);
  });

  it("should show verification email required message", () => {
    const {email, password} = generateRandomCredentials()
    cy.fastSignup(email, password);
    cy.get('body').should('contain.translationOf', 'signup.verificationRequired.message', {email});
  });

  it("should resend verification email correctly", () => {
    const {email, password} = generateRandomCredentials()
    cy.fastSignup(email, password);
    cy.containsTranslationOf('signup.verificationRequired.resend').click();
    cy.get('body').should('contain.translationOf', 'signup.verificationRequired.resendSuccess');
  });

  it("should verify email correctly", () => {
    const {email, password} = generateRandomCredentials()
    cy.fastSignup(email, password);
    cy.containsTranslationOf('signup.verificationRequired.message', {email});
    cy.intercept('**/setAccountInfo?**').as('verify');
    cy.getEmailVerificationLink(email).then(url => {
      const path = `/verify-email?${url.split('?')[1]}`
      cy.visit(path);
      cy.wait('@verify').its('response.body').should('deep.include', {email, emailVerified: true})
      cy.location('pathname').should('equal', '/dashboard')
    });
  });

  describe('should verify email correctly and ', () => {

    let verificationLink: string;

    before(() => {
      cy.clearLocalStorage()
      cy.clearIndexedDB();
      cy.visit(Cypress.config().baseUrl!);
      const {email, password} = generateRandomCredentials()
      cy.fastSignup(email, password);
      cy.containsTranslationOf('signup.verificationRequired.message', {email});
      cy.getEmailVerificationLink(email).then(url => {
        verificationLink = `/verify-email?${url.split('?')[1]}`;
      });
    })

    it('go to login if not authenticated', () => {
      cy.visit(verificationLink);
      cy.location('pathname').should('equal', '/login')
    })

  })

  describe("should show invalid code error", () => {

    let alreadyUsedLink: string;

    before(() => {
      cy.clearLocalStorage()
      cy.clearIndexedDB();
      cy.visit(Cypress.config().baseUrl!);

      const {email, password} = generateRandomCredentials()
      cy.fastSignup(email, password);
      cy.containsTranslationOf('signup.verificationRequired.message', {email});

      cy.intercept('**/setAccountInfo?**').as('verify');
      cy.getEmailVerificationLink(email).then(url => {
        const path = `/verify-email?${url.split('?')[1]}`
        cy.visit(path);
        alreadyUsedLink = `/verify-email?${url.split('?')[1]}`;
        cy.wait('@verify')

      });
    })

    it('on link reuse', () => {
      cy.visit(alreadyUsedLink);
      cy.get('body').should('contain.translationOf', 'auth.errors.auth/invalid-action-code')
    })

  });

  it("should show invalid code error on wrong params", () => {
    cy.visit('/verify-email?oobCode=noCode');
    cy.get('body').should('contain.translationOf', 'auth.errors.auth/invalid-action-code')
  });

});
