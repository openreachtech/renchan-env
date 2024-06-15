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
      this.createDotenvOptions()
    )

    if (dotenvConfig.error) {
      throw dotenvConfig.error
    }

    return dotenvConfig.parsed
  }

  /**
   * Create dotenv options
   *
   * @returns {Object.<string, *>} dotenv options.
   * @throws {Error} no NODE_ENV.
   */
  createDotenvOptions () {
    const path = this.resolveDotenvPath()

    return path
      ? { path }
      : {}
  }

  /**
   * resolve dotenv path
   *
   * @returns {string} dotenv options path.
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
