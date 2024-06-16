// @ts-check
'use strict'

const DotenvLoader = require('./DotenvLoader')

/**
 * Base Env
 */
class Environment {
  /**
   * Constructor.
   *
   * @param {EnvHash} envHash - env hash
   */
  constructor ({
    processEnv = process.env,
    dotenv =
      DotenvLoader.create({
        nodeEnv: processEnv.NODE_ENV,
      })
        .loadConfig(),
  } = {}) {
    this.dotenv = dotenv
    this.processEnv = processEnv

    this.proxyEnv = this.createProxyEnv()
  }

  /**
   * Factory method.
   *
   * @param {EnvHash} envHash - env hash
   * @returns {Environment} instance of Environment.
   */
  static create (envHash = {}) {
    return new this(envHash)
  }

  /**
   * get resolved environment.
   *
   * @param {EnvHash} envHash - env hash
   * @returns {Object.<string, string>} Proxy instance as env body.
   */
  static createEnv (envHash = {}) {
    return this.create(envHash).env
  }

  /**
   * env body for derived class.
   *
   * @returns {Object.<string, string>} Proxy instance as env body.
   */
  get env () {
    return this.proxyEnv
  }

  /**
   * NODE_ENV - getter
   *
   * @returns {string} value of NODE_ENV.
   */
  get NODE_ENV () {
    return this.env.NODE_ENV
  }

  /**
   * create proxy env.
   *
   * @returns {Object.<string, string>} Proxy instance as env body.
   */
  createProxyEnv () {
    const assignedEnv = {
      ...this.dotenv,
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

/**
 * @typedef {{
 *   dotenv?: Object.<string, string>,
 *   processEnv?: Object.<string, string>,
 * }} EnvHash
 */

/**
 * @module Environment
 */
module.exports = Environment
