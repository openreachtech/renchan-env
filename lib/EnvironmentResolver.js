'use strict'

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
    loadedDotenv,
    processEnv = process.env,
  }) {
    return new this({
      loadedDotenv,
      processEnv,
    })
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
 *   loadedDotenv: import('dotenv').DotenvParseOutput
 *   processEnv?: typeof globalThis.process.env
 * }} EnvironmentResolverFactoryParams
 */
