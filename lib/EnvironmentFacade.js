'use strict'

const EnvironmentResolver = require('./EnvironmentResolver')

/**
 * Environment variable handler to wrap resolved env object.
 */
class EnvironmentFacade {
  /**
   * Constructor of EnvironmentFacade.
   *
   * @param {EnvironmentFacadeParams} params - parameters of constructor.
   */
  constructor ({
    environmentHash,
  }) {
    this.environmentHash = environmentHash
  }

  /**
   * Create instance of EnvironmentResolver.
   *
   * @param {EnvironmentFacadeFactoryParams} params - Parameters of factory method.
   * @returns {EnvironmentFacade} An instance of EnvironmentResolver.
   */
  static create ({
    processEnv = process.env,
  } = {}) {
    const environmentHash =
      EnvironmentFacade.createResolver({
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

  /**
   * Is env.NODE_ENV 'live'?
   *
   * @returns {boolean} True: when NODE_ENV is 'live'.
   */
  isLive () {
    return this.env.NODE_ENV === 'live'
  }

  /**
   * Is not env.NODE_ENV 'production'?
   *
   * @returns {boolean} True: when NODE_ENV is not 'production'.
   */
  isPreProduction () {
    return !this.isProduction()
  }

  /**
   * Generate facade object.
   *
   * @returns {EnvironmentFacadeInterface} Facade object.
   */
  generateFacade () {
    return /** @type {*} */ (
      new Proxy(this.env, {
        /**
         * @param {Object.<string, string> | EnvironmentFacade} target - Proxy target object.
         * @param {string} memberName - Member name.
         * @param {*} receiver - Proxy object.
         * @returns {*} Value of member.
         * @throws {Error} When member is not found.
         */
        get: (target, memberName, receiver) => {
          if (memberName in this) {
            return this[memberName] instanceof Function
              ? this[memberName].bind(this)
              : this[memberName]
          }

          return Reflect.get(target, memberName, receiver)
        },
      })
    )
  }
}

module.exports = EnvironmentFacade

/**
 * @typedef {{
 *   environmentHash: Object.<string, string>
 * }} EnvironmentFacadeParams
 */

/**
 * @typedef {EnvironmentResolver.EnvironmentResolverFactoryParams} EnvironmentFacadeFactoryParams
 */

/**
 * @typedef {Object.<string, string> & {
 *   isProduction: () => boolean
 *   isDevelopment: () => boolean
 *   isStaging: () => boolean
 *   isLive: () => boolean
 *   isPreProduction: () => boolean
 * }} EnvironmentFacadeInterface
 */
