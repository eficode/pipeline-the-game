/// <reference types="Cypress" />
/// <reference types="../support" />
import {generateRandomCredentials} from "./utils/generators";
import {GameEntity} from "../../src/_shared/models";

// @ts-ignore
context("Game board", () => {

  let email: string;
  let password: string;
  let game: GameEntity;

  before(() => {
    cy.clearLocalStorage()
    cy.clearIndexedDB();
    cy.visit(Cypress.config().baseUrl!);
    const {email: e, password: p} = generateRandomCredentials();
    email = e;
    password = p;
     cy.initializeUser({email, password, emailVerified: true}).then(user => {

      return cy.initializeGame({facilitatorId: user.uid}).then(gameData => {
        game = gameData;
      })
    });
    return cy.fastLogin(email, password);
  });

  beforeEach(() => {
    cy.visit(`/game/${game.id}`);
  });

  describe('Exit game', () => {

    it("should show dialog on click", () => {
      cy.getElementById('exit-game').click();
      cy.get('body').should('contain.translationOf', 'game.confirmExit.title');
      cy.getElementById('cancel-exit').should('exist');
      cy.getElementById('confirm-exit').should('exist');
    });

    it("should go back to game on cancel click", () => {
      cy.getElementById('exit-game').click();
      cy.getElementById('cancel-exit').click();
      cy.get('body').should('not.contain.translationOf', 'game.confirmExit.title');
      cy.location('pathname').should('eq', `/game/${game.id}`);
    });

    it("should go back to game on cancel click", () => {
      cy.getElementById('exit-game').click();
      cy.getElementById('confirm-exit').click();
      cy.location('pathname').should('eq', `/dashboard`);
    });

  });

  describe('Game not found', () => {

    it("it should show error when accessing to not present game", () => {
      cy.visit(`/game/non-existing-id`);
      cy.get('body').should('contain.translationOf', 'game.notFound');
    });

    it("it should return to dashboard pressing exit", () => {
      cy.visit(`/game/non-existing-id`);
      cy.containsTranslationOf( 'button', 'general.exit').click();
      cy.location('pathname').should('eq', '/dashboard');

    });

  });


});
