// @ts-check
'use strict'

const Environment = require('../../lib/Environment')

module.exports =

  /**
   * @type {{
   *   NODE_ENV: string,
   *   API_HOST?: string,
   *   API_KEY?: string,
   * }}
   */
  (Environment.createEnv())
