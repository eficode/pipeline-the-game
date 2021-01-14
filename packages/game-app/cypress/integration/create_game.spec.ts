/// <reference types="Cypress" />
/// <reference types="../support" />
import {generateRandomCredentials} from "./utils/generators";

// @ts-ignore
context("Create Game", () => {

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
    cy.visit('/create-game');
  });

  it("should render all the cards scenario correctly", () => {
    cy.queryFirestore('cards', {field: 'type', condition: '==', value: 'scenario'}).then((docs: any[]) => {
      cy.get('[id*="scenario-"]').should('have.length', docs.length);
      for (const doc of docs) {
        cy.get('form').should('contain', doc.title);
        cy.get('form').should('contain', doc.content);
      }
    })
  });

  it("should select card scenario correctly", () => {
    cy.get('[id*="scenario-"]').first().click();
    cy.get('[id*="scenario-"]').first().should('have.css', 'border', '2px solid rgb(0, 134, 124)')
    cy.getInputByName('scenarioTitle').should('be.disabled');
    cy.getInputByName('scenarioContent').should('be.disabled');
  });

  it("should create scenario correctly from card", () => {
    cy.get('[id*="scenario-"]').first().click();
    cy.containsTranslationOf('createGame.createButtonText').click();
    cy.location('pathname').should('contain', '/game');
  });

  it("should show error on invalid values", () => {
    cy.containsTranslationOf('createGame.createButtonText').click();
    cy.get('body').should('contain.translationOf', 'general.errors.required');
  });

  it("should create scenario correctly using form", () => {
    cy.getInputByName('scenarioTitle').fill('scenario test title');
    cy.getInputByName('scenarioContent').fill('scenario test content');
    cy.containsTranslationOf('createGame.createButtonText').click();
    cy.location('pathname').should('contain', '/game').then(path=>{
      const id = path.replace('/game/', '');
      cy.getFirestoreDocument(`/games/${id}`).then(doc=>{
        expect(doc.scenarioTitle).to.equal('scenario test title');
        expect(doc.scenarioContent).to.equal('scenario test content');
      })
    });
  });


});
