import adminFirebasePlugin from './firebaseAdminPlugin';
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    require('@cypress/code-coverage/task')(on, config)
    adminFirebasePlugin(on, config);
    return config;
}
