'use strict'

const EnvironmentHandler = require('../lib/EnvironmentHandler')

const handler = EnvironmentHandler.create()

module.exports = handler.generateFacade()
