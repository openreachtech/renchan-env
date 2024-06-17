'use strict'

const DotenvLoader = require('./DotenvLoader')

/**
 * Environment variable resolver.
 */
class EnvironmentResolver {
  /**
   * Constructor of EnvironmentResolver.
   *
   * @param {EnvironmentResolverParams} params - parameters of constructor.
   */
  constructor ({
    loadedDotenv,
    processEnv,
  }) {
    this.loadedDotenv = loadedDotenv
    this.processEnv = processEnv
  }

  /**
   * Factory method of EnvironmentResolver.
   *
   * @param {EnvironmentResolverFactoryParams} params - Parameters of factory method.
   * @returns {EnvironmentResolver} An instance of EnvironmentResolver.
   */
  static create ({
    processEnv = process.env,
  } = {}) {
    const loadedDotenv = this.loadDotenv({
      nodeEnv: processEnv.NODE_ENV,
    })

    return new this({
      loadedDotenv,
      processEnv,
    })
  }

  /**
   * Load dotenv.
   *
   * @param {{
   *   nodeEnv: string
   * }} params - Parameters.
   * @returns {import('dotenv').DotenvParseOutput} Loaded dotenv.
   */
  static loadDotenv ({
    nodeEnv,
  }) {
    const loader = DotenvLoader.create({
      nodeEnv,
    })

    return loader.loadConfig()
  }
}

module.exports = EnvironmentResolver

/**
 * @typedef {{
 *   loadedDotenv: import('dotenv').DotenvParseOutput
 *   processEnv: typeof globalThis.process.env
 * }} EnvironmentResolverParams
 */

/**
 * @typedef {{
 *   processEnv?: typeof globalThis.process.env
 * }} EnvironmentResolverFactoryParams
 */
