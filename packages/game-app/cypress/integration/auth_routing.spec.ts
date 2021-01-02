/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />
import "firebase/auth";
import firebase from "firebase/app";

context("Routing", () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.clearIndexedDB();
    cy.visit(Cypress.config().baseUrl!);
  });

  it("should be redirected from Dashboard if not authenticated", () => {
    cy.visit("/dashboard");
    cy.location("pathname").should("equal", "/signup");
  });

  it("should show login page", () => {
    cy.visit("/login");
    cy.location("pathname").should("equal", "/login");
  });

  it("should redirect non-matching URLs to signup", () => {
    cy.visit("/not-available-url");
    cy.location("pathname").should("equal", "/signup");
  });

});
