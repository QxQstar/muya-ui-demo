const {alias, configPaths} = require('react-app-rewire-alias')
const path = require('path');

module.exports = function override(config) {
  alias(configPaths('./tsconfig.paths.json'))(config)
  return config
}