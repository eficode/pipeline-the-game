/// <reference types="Cypress" />
/// <reference types="../support" />

// @ts-ignore
context("Signup", () => {

  const usedEmails: string[] = [];

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl!);
  });

  // TODO test for all required fields
  it("should show invalid email error message", () => {
    cy.getInputByName('email').type('non-valid-email');
    cy.get('button').click();
    cy.get('body').should('contain', 'signup.invalidEmail')
  });

  it("should show invalid password error", () => {
    cy.getInputByName('password').type('123456789');
    cy.get('button').click();
    cy.get('body').should('contain', 'signup.passwordRequirements')
  });

  it("should not show invalid password error for correct password", () => {
    cy.getInputByName('password').type('Aa1%sfesfsf');
    cy.get('button').click();
    cy.get('body').should('not.contain', 'signup.passwordRequirements')
  });

  it("should show mismatch password error", () => {
    cy.getInputByName('password').type('123456789');
    cy.getInputByName('repeatPassword').type('123456788');
    cy.get('button').click();
    cy.get('body').should('contain', 'signup.passwordMatch')
  });

  it("should signup correctly", () => {
    const randomEmail = `testEmail${Math.floor(Math.random() * 1000)}@email.com`.toLocaleLowerCase();
    usedEmails.push(randomEmail);
    cy.getInputByName('email').type(randomEmail);
    cy.getInputByName('password').type('Aa1%sfesfsf');
    cy.getInputByName('repeatPassword').type('Aa1%sfesfsf');
    cy.getInputByName('role').select('endUser');
    cy.getInputByName('devOpsMaturity').select('veryImmature');
    cy.get('button').click();
    cy.get('body').should('contain', 'Loading');
    cy.get('body').should('contain', 'Success');

    // check auth presence
    cy.getFirebaseUserByEmail(randomEmail).should((user) => {
      expect(user.email).eq(randomEmail)
      expect(user.emailVerified).eq(false)
      expect(user.disabled).eq(false);

      // check firestore data
      cy.getFirestoreDocument(`users/${user.uid}`).should((data) => {
        expect(data.devOpsMaturity).eq('veryImmature')
        expect(data.role).eq('endUser')
        expect(data.email).eq(randomEmail)
      });
    });
  });

  it("should show email already used error", () => {
    const alreadyUsedEmail = usedEmails[0];
    cy.getInputByName('email').type(alreadyUsedEmail);
    cy.getInputByName('password').type('Aa1%sfesfsf');
    cy.getInputByName('repeatPassword').type('Aa1%sfesfsf');
    cy.getInputByName('role').select('endUser');
    cy.getInputByName('devOpsMaturity').select('veryImmature');
    cy.get('button').click();
    cy.get('body').should('contain', 'The email address is already in use by another account.');
  });

});
