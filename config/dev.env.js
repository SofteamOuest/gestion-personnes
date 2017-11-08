var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_PERSONNES_URL : '"http://localhost:3000/api-personnes-mock/api/personnes/"'
})
