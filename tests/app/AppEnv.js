// @ts-check
'use strict'

const Environment = require('../../lib/Environment')

class AppEnv extends Environment {
  get API_HOST () {
    return this.env.API_HOST
  }

  get API_KEY () {
    return this.env.API_KEY
  }
}

module.exports = AppEnv
