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
