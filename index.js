'use strict'

const DotenvLoader = require('./lib/DotenvLoader')
const EnvironmentFacade = require('./lib/EnvironmentFacade')
const EnvironmentResolver = require('./lib/EnvironmentResolver')

/**
 * The entry point.
 *
 * @module Environment
 */
module.exports = {
  DotenvLoader,
  EnvironmentFacade,
  EnvironmentResolver,
}
