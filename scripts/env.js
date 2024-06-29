'use strict'

const EnvironmentHandler = require('../lib/EnvironmentFacade')

const handler = EnvironmentHandler.create()

module.exports = handler.generateFacade()
