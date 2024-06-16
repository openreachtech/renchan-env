'use strict'

const AppEnv = require('../../app/AppEnv')

/*
 * process.env will be updated by `dotenv.config()`.
 */
const processEnv = process.env

beforeEach(() => {
  process.env = { ...processEnv }
})
afterEach(() => {
  process.env = processEnv
})

describe('AppEnv', () => {
  describe('NODE_ENV variation', () => {
    /** @type {Array} */
    const cases = [
      ['development', {
        NODE_ENV: 'development',
        API_HOST: 'dev.openreach.tech',
        API_KEY: 'development-api-key',
      }],
      ['staging', {
        NODE_ENV: 'staging',
        API_HOST: 'staging.openreach.tech',
        API_KEY: 'staging-api-key',
      }],
    ]

    test.each(cases)('%o', (nodeEnv, expectedEnv) => {
      const appEnv = /** @type {AppEnv} */ (AppEnv.create({
        processEnv: {
          NODE_ENV: nodeEnv
        }
      }))

      expect(appEnv.NODE_ENV).toEqual(nodeEnv)
      expect(appEnv.API_HOST).toEqual(expectedEnv.API_HOST)
      expect(appEnv.API_KEY).toEqual(expectedEnv.API_KEY)
    })
  })

  describe('throw with lacked env', () => {
    /** @type {Array} */
    const cases = [
      ['development'],
      ['staging'],
    ]

    const dotenv = {
      API_HOST: 'unknown.openreach.tech',
    }

    test.each(cases)('%o', (nodeEnv) => {
      const appEnv = /** @type {AppEnv} */ (AppEnv.create({
        processEnv: {
          NODE_ENV: nodeEnv
        },
        dotenv
      }))

      expect(() => appEnv.API_KEY)
        .toThrowError('environment variable is not defined [API_KEY]')
    })
  })
})
