// @ts-check
'use strict'

const dotenv = require('dotenv')
const path = require('path')

class DotenvLoader {
  /**
   * Constructor of DotenvLoader.
   *
   * @param {DotenvLoaderParams} params - parameters of constructor.
   */
  constructor ({
    nodeEnv,
  }) {
    this.nodeEnv = nodeEnv
  }

  /**
   * Factory method of DotenvLoader.
   *
   * @param {DotenvLoaderFactoryParams} params - parameters of factory method.
   * @returns {DotenvLoader} An instance of DotenvLoader.
   */
  static create({
    nodeEnv,
  }) {
    return new this({
      nodeEnv,
    })
  }

  /**
   * load helper
   *
   * @param {string} nodeEnv - node env
   * @returns {Object.<string, string>} parsed .env contents.
   */
  static load (nodeEnv) {
    return new this({
      nodeEnv,
    }).loadConfig()
  }

  /**
   * load dotenv config.
   *
   * @returns {Object} resolved dotenv.
   * @throws {Error} fail to load.
   */
  loadConfig () {
    const dotenvConfig = dotenv.config(
      this.generateDotenvOptions()
    )

    if (dotenvConfig.error) {
      throw dotenvConfig.error
    }

    return dotenvConfig.parsed
  }

  /**
   * Generate dotenv options.
   *
   * @returns {Object.<string, *>} dotenv options.
   * @throws {Error} no NODE_ENV.
   */
  generateDotenvOptions () {
    const path = this.resolveDotenvPath()

    return path
      ? { path }
      : {}
  }

  /**
   * resolve dotenv path
   *
   * @returns {string | null} dotenv options path.
   * @throws {Error} no NODE_ENV.
   */
  resolveDotenvPath () {
    if (!this.nodeEnv) {
      throw new Error('no NODE_ENV')
    }

    if (this.nodeEnv === 'production') {
      return null
    }

    return path.resolve(process.cwd(), `.env.${this.nodeEnv}`)
  }
}

module.exports = DotenvLoader

/**
 * @typedef {{
 *   nodeEnv: string
 * }} DotenvLoaderParams
 */

/**
 * @typedef {DotenvLoaderParams} DotenvLoaderFactoryParams
 */
