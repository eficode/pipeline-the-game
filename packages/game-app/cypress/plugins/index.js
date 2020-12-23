/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    require('@cypress/code-coverage/task')(on, config)

    return config;
}
