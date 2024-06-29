'use strict'

const EnvironmentFacade = require('../lib/EnvironmentFacade')

const handler = EnvironmentFacade.create()

module.exports = handler.generateFacade()
