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

  /**
   * Create proxy environment.
   *
   * @returns {Object.<string, string>} Proxy instance as env body.
   */
  createProxyEnv () {
    const assignedEnv = {
      ...this.loadedDotenv,
      ...this.processEnv,
    }

    return new Proxy(assignedEnv, {
      /**
       * get value
       *
       * @param {Object.<string, string>} target - target instance.
       * @param {string} key - property name.
       * @returns {string} value
       * @throws {Error} environment variable is not defined.
       */
      get (target, key) {
        if (!Reflect.has(target, key)) {
          throw new Error(`environment variable is not defined [${key}]`)
        }

        return Reflect.get(target, key)
      },

      /**
       * set value
       *
       * @param {Object.<string, string>} _ - target instance.
       * @param {string} key - property name.
       * @return {boolean} - result to set.
       * @throws {Error} can not modify environment variable.
       */
      set (_, key) {
        throw new Error(`can not modify environment variable [${key}]`)
      }
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
 *   processEnv?: typeof globalThis.process.env
 * }} EnvironmentResolverFactoryParams
 */
