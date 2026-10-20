'use strict'

const DotenvLoader = require('./lib/DotenvLoader')
const EnvironmentFacade = require('./lib/EnvironmentFacade')
const EnvironmentResolver = require('./lib/EnvironmentResolver')
const ValueSeparator = require('./lib/ValueSeparator')

/**
 * The entry point.
 *
 * @module Environment
 */
module.exports = {
  DotenvLoader,
  EnvironmentFacade,
  EnvironmentResolver,
  ValueSeparator,
}
