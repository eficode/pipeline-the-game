import 'cypress-wait-until';
import './commands'
import '@cypress/code-coverage/support'
import './customAssertions'


Cypress.on("window:before:load", (win) => {
    win.ga = cy.stub().as("ga");
});
