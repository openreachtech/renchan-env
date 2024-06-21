'use strict'

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
}

module.exports = EnvironmentHandler

/**
 * @typedef {{
 *   environmentHash: Object.<string, string>
 * }} EnvironmentHandlerParams
 */
