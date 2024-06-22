'use strict'

const env = require('../scripts/env')

module.exports = /** @type {EnvHash} */ (env)

/**
 * @typedef {{
 *   NODE_ENV: string
 *   API_HOST: string
 *   API_KEY: string
 * }} EnvHash
 */
