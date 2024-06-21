'use strict'

const EnvironmentResolver = require('./EnvironmentResolver')

/**
 * Environment variable handler to wrap resolved env object.
 */
class EnvironmentHandler {
  /**
   * Constructor of EnvironmentHandler.
   *
   * @param {EnvironmentHandlerParams} params - parameters of constructor.
   */
  constructor ({
    environmentHash,
  }) {
    this.environmentHash = environmentHash
  }

  /**
   * Create instance of EnvironmentResolver.
   *
   * @param {EnvironmentHandlerFactoryParams} params - Parameters of factory method.
   * @returns {EnvironmentHandler} An instance of EnvironmentResolver.
   */
  static create ({
    processEnv = process.env,
  }) {
    const environmentHash =
      EnvironmentHandler.createResolver({
        processEnv,
      })
        .createProxyEnv()

    return new this({
      environmentHash,
    })
  }

  /**
   * Create instance of EnvironmentResolver.
   *
   * @param {EnvironmentResolver.EnvironmentResolverFactoryParams} params - Parameters of factory method.
   * @returns {EnvironmentResolver} An instance of EnvironmentResolver.
   */
  static createResolver ({
    processEnv = process.env,
  } = {}) {
    return EnvironmentResolver.create({
      processEnv,
    })
  }

  /**
   * Getter of environmentHash.
   *
   * @returns {Object.<string, string>} Environment variable hash.
   */
  get env () {
    return this.environmentHash
  }

  /**
   * Getter of NODE_ENV.
   *
   * @returns {string | null} NODE_ENV value.
   */
  get nodeEnv () {
    return this.env?.NODE_ENV
      ?? null
  }

  /**
   * Is env.NODE_ENV 'production'?
   *
   * @returns {boolean} True: when NODE_ENV is 'production'.
   */
  isProduction () {
    return this.env.NODE_ENV === 'production'
  }

  /**
   * Is env.NODE_ENV 'development'?
   *
   * @returns {boolean} True: when NODE_ENV is 'development'.
   */
  isDevelopment () {
    return this.env.NODE_ENV === 'development'
  }

  /**
   * Is env.NODE_ENV 'staging'?
   *
   * @returns {boolean} True: when NODE_ENV is 'staging'.
   */
  isStaging () {
    return this.env.NODE_ENV === 'staging'
  }
}

module.exports = EnvironmentHandler

/**
 * @typedef {{
 *   environmentHash: Object.<string, string>
 * }} EnvironmentHandlerParams
 */

/**
 * @typedef {EnvironmentResolver.EnvironmentResolverFactoryParams} EnvironmentHandlerFactoryParams
 */
