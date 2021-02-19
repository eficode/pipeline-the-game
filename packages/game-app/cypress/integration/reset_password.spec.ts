/// <reference types="Cypress" />
/// <reference types="../support" />
import {generateRandomCredentials, generateRandomPassword} from "./utils/generators";

// @ts-ignore
context("Password forgot and reset", () => {

  let currentEmail: string;

  before(() => {
    const {email, password} = generateRandomCredentials()
    currentEmail = email;
    cy.initializeUser({password, email, emailVerified: true})
  });

  beforeEach(() => {
    cy.viewport(1200, 700);
    cy.clearLocalStorage()
    cy.clearIndexedDB();
  });

  it("should go to forgot password pressing the button in the login page", () => {
    cy.visit(Cypress.config().baseUrl!);
    cy.getElementById('forgot-password-button').click();
    cy.location('pathname').should('eq', '/forgot-password')
  });

  it("should show error on non existing user", () => {
    cy.visit('/forgot-password');
    cy.getInputByName('email').fill('anyEmail@test.com');
    cy.getElementById('send-forgot-password').click();
    cy.containsTranslationOf('auth.errors.auth/user-not-found')
  });

  it("should send reset password link correctly", () => {
    cy.visit('/forgot-password');
    cy.getInputByName('email').fill(currentEmail);
    cy.getElementById('send-forgot-password').click();
    cy.containsTranslationOf('forgotPassword.success.title')
  });

  it("should reset password correctly and login with new credentials", () => {
    cy.visit('/forgot-password');
    cy.getInputByName('email').fill(currentEmail);
    cy.getElementById('send-forgot-password').click();
    cy.intercept('**/resetPassword?**').as('resetCheck');
    cy.getRestPasswordLink(currentEmail).then(url => {
      const path = `/reset-password?${url.split('?')[1]}`
      cy.visit(path);
      cy.wait('@resetCheck').its('response.body').should('deep.include', {email:currentEmail, requestType: 'PASSWORD_RESET'});
      const newPassword = generateRandomPassword();
      cy.getInputByName('password').fill(newPassword);
      cy.getInputByName('repeatPassword').fill(newPassword);
      cy.getElementById('reset-password-button').click();
      cy.wait('@resetCheck').its('request.body').should('deep.include', {newPassword:newPassword});
      cy.getElementById('back-to-login-button').click();
      cy.fastLogin(currentEmail, newPassword);
      cy.location('pathname').should('eq', '/dashboard')
    });
  });

  describe("should show error trying to reset the password", () => {

    let alreadyUsedLink:string;

    before(()=>{
      cy.clearLocalStorage()
      cy.clearIndexedDB();
      cy.visit('/forgot-password');
      cy.viewport(1200, 700);
      cy.getInputByName('email').fill(currentEmail);
      cy.getElementById('send-forgot-password').click();
      cy.getRestPasswordLink(currentEmail).then(url => {
        const path = `/reset-password?${url.split('?')[1]}`
        alreadyUsedLink = path;
        cy.visit(path);
        const newPassword = generateRandomPassword();
        cy.getInputByName('password').fill(newPassword);
        cy.getInputByName('repeatPassword').fill(newPassword);
        cy.getElementById('reset-password-button').click();
      });
    })


    it('link already used', ()=>{
      cy.visit(alreadyUsedLink);
      cy.get('body').should('contain.translationOf', 'auth.errors.auth/invalid-action-code');
    });
  });

  it("should show a small screen error dialog", () => {
    cy.visit('/forgot-password');
    cy.viewport(1000, 700);
    cy.waitUntil(() => Cypress.$("#small-screen-dialog").length === 1);
    cy.get('body').should('contain.translationOf', 'general.responsiveness.title');
    cy.get('body').should('contain.translationOf', 'general.responsiveness.subtitle');
  });
});
