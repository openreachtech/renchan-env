// @ts-check
'use strict'

const Environment = require('../../lib/Environment')

module.exports = /** @type {EnvHash} */ (Environment.createEnv())

/**
 * @typedef {{
 *   NODE_ENV: string,
 *   API_HOST?: string,
 *   API_KEY?: string,
 * }} EnvHash
 */
