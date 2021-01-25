/// <reference types="Cypress" />
/// <reference types="../support" />
import {generateRandomCredentials} from "./utils/generators";

// @ts-ignore
context("Dashboard", () => {

  before(() => {
    cy.clearLocalStorage()
    cy.clearIndexedDB();
    cy.visit(Cypress.config().baseUrl!);
    const {email, password} = generateRandomCredentials()
    cy.initializeUser({email, password, emailVerified: true}).then(user => {
      cy.fastLogin(email, password);
    });
  });

  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it("should go to create game correctly", () => {
    cy.containsTranslationOf('button', 'dashboard.newGameLabel').click();
    cy.location('pathname').should('equal', '/create-game');
  });

  it("should show join input correctly", () => {
    cy.containsTranslationOf('button', 'dashboard.joinButton').click();
    cy.containsTranslationOf('button','dashboard.joinButton').should('not.exist');
    cy.get('#join-link-field').should('exist');
  });

  it("should show join button on input fill", () => {
    cy.containsTranslationOf('button', 'dashboard.joinButton').click();
    cy.get('#join-link-field').type('bla bla');
    cy.containsTranslationOf('button', 'dashboard.joinButton').should('exist');
  });

  it("should go nowhere if invalid link", () => {
    cy.containsTranslationOf('button', 'dashboard.joinButton').click();
    cy.get('#join-link-field').type('bla bla');
    cy.containsTranslationOf('button', 'dashboard.joinButton').click();
    cy.location('pathname').should('equal', '/dashboard');
  });

  it("should go to game if a correct link is inserted", () => {
    cy.containsTranslationOf('button', 'dashboard.joinButton').click();
    cy.get('#join-link-field').type(`${Cypress.config().baseUrl!}/game/fakegameid`);
    cy.containsTranslationOf('button', 'dashboard.joinButton').click();
    cy.location('pathname').should('equal', '/game/fakegameid');
  });

  it("should sign out correcly", () => {
    cy.get('#logout-button').click();
    cy.location('pathname').should('equal', '/login');
  });

});
