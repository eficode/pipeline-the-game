const {alias, configPaths} = require('react-app-rewire-alias')

module.exports = function override(config, env) {
    return alias(configPaths('./tsconfig.paths.json'))(config);
}
