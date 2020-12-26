/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />
import "firebase/auth";
import firebase from "firebase/app";

context("Routing", () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl);
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

  it("should show Dashboard to authenticated user", () => {
    cy.window().then((win) => {
      ((win as any).firebase as typeof firebase)
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then((_) => {
          ((win as any).firebase as typeof firebase)
            .auth()
            .signInWithEmailAndPassword("test@test.test", "t3st-u53r-111!")
            .then(() => {
              cy.visit("/dashboard");
              cy.location("pathname").should("equal", "/dashboard");
            });
        });
    });
  });
});
