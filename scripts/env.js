'use strict'

const EnvironmentFacade = require('../lib/EnvironmentFacade')

const facade = EnvironmentFacade.create()

module.exports = facade.generateFacade()
