'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const API_URL = "'http://xxx'"; //开发环境

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: API_URL
})
