// @ts-check
'use strict'

const DotenvLoader = require('./DotenvLoader')

/**
 * Base Env
 */
class Environment {
  /**
   * Constructor.
   * @param {EnvHash} envHash - env hash
   */
  constructor ({
    processEnv = process.env,
    dotenv = DotenvLoader.load(processEnv.NODE_ENV),
  } = {}) {
    this.dotenv = dotenv
    this.processEnv = processEnv

    this.assignedEnv = {
      ...this.dotenv,
      ...this.processEnv,
    }
  }

  /**
   * Factory method.
   * @param {EnvHash} envHash - env hash
   * @returns {Environment} instance of Environment.
   */
  static create (envHash = {}) {
    return new this(envHash)
  }

  /**
   * get resolved environment.
   * @param {EnvHash} envHash - env hash
   * @returns {Object.<string, string>} Proxy instance as env body.
   */
  static createEnv (envHash = {}) {
    return this.create(envHash).env
  }

  /**
   * env body for derived class.
   * @returns {Object.<string, string>} Proxy instance as env body.
   */
  get env () {
    return new Proxy(this.assignedEnv, {
      /**
       * get value
       * @param {Object.<string, string>} target - target instance.
       * @param {string} key - property name.
       * @param {Proxy} receiver - Proxy instance.
       * @returns {string} value
       * @throws {Error} not found the property.
       */
      get (target, key, receiver) {
        if (key in target) {
          return Reflect.get(target, key, receiver)
        }

        throw new Error(`not found [${key}]`)
      }
    })
  }

  /**
   * NODE_ENV - getter
   * @returns {string} value of NODE_ENV.
   */
  get NODE_ENV () {
    return this.env.NODE_ENV
  }

  /**
   * create proxy env.
   * @returns {Object.<string, string>} Proxy instance as env body.
   */
  createProxyEnv () {
    return new Proxy(this.assignedEnv, {
      /**
       * get value
       * @param {Object.<string, string>} target - target instance.
       * @param {string} key - property name.
       * @returns {string} value
       * @throws {Error} environment variable is not defined.
       */
      get (target, key) {
        if (key in target) {
          return Reflect.get(target, key)
        }

        throw new Error(`environment variable is not defined [${key}]`)
      },

      /**
       * set value
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
