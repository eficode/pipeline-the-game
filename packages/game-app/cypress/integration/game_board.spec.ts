/// <reference types="Cypress" />
/// <reference types="../support" />
import {generateRandomCredentials} from "./utils/generators";
import {GameEntity} from "../../src/_shared/models";
import {CardEntity, CardType, FirebaseCollection} from "@pipeline/common";

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
    cy.waitUntil(() => Cypress.$("#initial-loading-overlay").length === 0);
    cy.waitUntil(() => Cypress.$('#loading-game-overlay').length === 0);
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
      cy.containsTranslationOf('button', 'general.exit').click();
      cy.location('pathname').should('eq', '/dashboard');

    });

  });

  describe('Deck panel', () => {

    const CLOSED_PANEL_WIDTH = 40;

    it('should close panel correctly', () => {
      cy.getElementById('panel-container').invoke('outerWidth').then(width => {
        cy.getElementById('toggle-panel-button').click();
        cy.getElementById('panel-container').should('have.css', 'right', `${-width! + CLOSED_PANEL_WIDTH}px`)
      });
    });

    it('should reopen panel correctly', () => {
      cy.getElementById('panel-container').invoke('outerWidth').then(originalWidth => {
        cy.getElementById('toggle-panel-button').click();
        cy.getElementById('toggle-panel-button').click();
        cy.getElementById('panel-container').should('have.css', 'right', `0px`)
        cy.getElementById('panel-container').should('have.css', 'width', `${originalWidth}px`)
      });
    });

    it('should change view to grid correctly', () => {
      cy.getElementById('panel-container').invoke('outerWidth').then(width => {
        cy.getElementById('button-columns-panel').click();
        cy.getElementById('panel-container').invoke('outerWidth').should('be.greaterThan', width)
      });
    });

    it('should change view to stacked correctly', () => {
      cy.getElementById('button-columns-panel').click();
      cy.getElementById('panel-container').invoke('outerWidth').then(width => {
        cy.getElementById('button-stacked-panel').click();
        cy.getElementById('panel-container').invoke('outerWidth').should('be.lessThan', width)
      });
    });

    function filterCards(cards: CardEntity[], text: string) {
      return cards.filter(cardData => {
        return (
          cardData.content.toLowerCase().includes(text) ||
          cardData.title.toLowerCase().includes(text) ||
          cardData.subtitle?.toLowerCase()?.includes(text) ||
          cardData.tags?.some(t => t.toLowerCase().includes(text))
        );
      });
    }

    it('should filter card correctly based on searched text: "test"', () => {
      cy.get("[data-cy^=\"card-\"]", {timeout: 10000});
      const searchedText = 'test';
      cy.getInputByName('card-search-text').fill(searchedText);
      cy.queryFirestore<CardEntity>(FirebaseCollection.Cards, {
        field: 'type', condition: '==', value: CardType.PipelineStep
      }).then(cards => {
        const filteredCards = filterCards(cards, searchedText);
        cy.get("[data-cy^=\"card-\"]").should('have.length', filteredCards.length);
      })
    });

    it('should filter card correctly based on searched text: "environment"', () => {
      cy.get("[data-cy^=\"card-\"]", {timeout: 10000});
      const searchedText = 'environment';
      cy.getInputByName('card-search-text').fill(searchedText);
      cy.queryFirestore<CardEntity>(FirebaseCollection.Cards, {
        field: 'type', condition: '==', value: CardType.PipelineStep
      }).then(cards => {
        const filteredCards = filterCards(cards, searchedText);
        cy.get("[data-cy^=\"card-\"]").should('have.length', filteredCards.length);
      })
    });

    it('should clear searched text correctly', () => {
      cy.get("[data-cy^=\"card-\"]", {timeout: 10000});
      const searchedText = 'environment';
      cy.getInputByName('card-search-text').fill(searchedText);
      cy.queryFirestore<CardEntity>(FirebaseCollection.Cards, {
        field: 'type', condition: '==', value: CardType.PipelineStep
      }).then(cards => {
        const filteredCards = filterCards(cards, searchedText);
        cy.get("[data-cy^=\"card-\"]").should('have.length', filteredCards.length);
        cy.getElementById('clear-search-button').click();
        cy.get("[data-cy^=\"card-\"]").should('have.length', cards.length);
      })
    });

  });


  describe('Scenario panel', () => {

    it("should not be visible by default", () => {
      cy.getElementById('scenario-panel-content').should('not.be.visible')
    });

    it("should become visible on header click", () => {
      cy.getElementById('scenario-panel').click()
      cy.getElementById('scenario-panel-content').should('be.visible')
    });

    it("should contain correct scenario data", () => {
      cy.getFirestoreDocument<GameEntity>(`${FirebaseCollection.Games}/${game.id}`).then(gameData => {

        cy.getElementById('scenario-panel').should('contain', gameData.scenarioTitle);
        cy.getElementById('scenario-panel').should('contain', gameData.scenarioContent);
      })
    });

  })

  describe("Game Rules", () => {

    it("should show all the game rules correcly", () => {
      cy.getElementById('show-rules-button').click();
      cy.get('body').should('contain.translationOf', 'game.rules');
      cy.queryFirestore<CardEntity>(FirebaseCollection.Cards, {
        field: 'type', condition: '==', value: CardType.GameRule
      }).then(cards => {
        cy.wrap(cards).each(c => {
          cy.get('body').should('contain', c.title);
        })
      })
    });

    it("should toggle content visibility on click", () => {
      cy.getElementById('show-rules-button').click();
      return cy.get('[id^="rule-"]').first().within($el => {
        cy.get('[id$="content"]').should('not.be.visible');
        cy.wrap($el).click();
        cy.get('[id$="content"]').should('be.visible');
        cy.wrap($el).click();
        cy.get('[id$="content"]').should('not.be.visible');
      })
    });
  });


});
