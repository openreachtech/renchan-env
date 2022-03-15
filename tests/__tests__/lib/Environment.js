// @ts-check
'use strict'

const Environment = require('../../../lib/Environment')

const developmentDotenv = {
  API_HOST: 'dev.openreach.tech',
  API_KEY: 'devdev',
}
const extraDotenv = {
  API_HOST: 'extra.openreach.tech',
  API_KEY: 'extraextra',
}
const stagingDotenv = {
  API_HOST: 'staging.openreach.tech',
  API_KEY: 'staginguhyo',
}

const developmentProcessEnv = {
  NODE_ENV: 'development',
  APP_NAME: 'App Name Exported in Terminal',
}
const extraProcessEnv = {
  NODE_ENV: 'extra',
  APP_NAME: 'App Name as Extra in test',
}

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

describe('Environment', () => {
  describe('.create()', () => {
    /** @type {Array<*>} */
    const cases = [
      [[]],
      [[{}]],
      [[{
        dotenv: {
          AAA: 'aaa111',
          BBB: 'bbb222',
        },
      }]],
      [[{
        processEnv: extraProcessEnv,
      }]],
      [[{
        dotenv: {
          AAA: 'aaa333',
          BBB: 'bbb444',
        },
        processEnv: extraProcessEnv,
      }]],
    ]

    test.each(cases)('%o', (params) => {
      const env = Environment.create(...params)

      expect(env instanceof Environment).toBeTruthy()
    })
  })

  describe('#dotenv', () => {
    const cases = [
      {
        envHash: null,
        expected: developmentDotenv,
      },
      {
        envHash: {},
        expected: developmentDotenv,
      },
      {
        envHash: {
          dotenv: extraDotenv
        },
        expected: extraDotenv,
      },
      {
        envHash: {
          processEnv: extraProcessEnv
        },
        expected: extraDotenv,
      },
      {
        envHash: {
          dotenv: stagingDotenv,
          processEnv: extraProcessEnv
        },
        expected: stagingDotenv,
      },
    ]

    test.each(cases)('$envHash', ({
      envHash,
      expected
    }) => {
      const env = envHash
        ? new Environment(envHash)
        : new Environment()

      expect(env.dotenv).toEqual(expected)
    })
  })

  describe('#processEnv', () => {
    const cases = [
      {
        envHash: null,
        expected: developmentProcessEnv,
      },
      {
        envHash: {},
        expected: developmentProcessEnv,
      },
      {
        envHash: {
          dotenv: extraDotenv
        },
        expected: developmentProcessEnv,
      },
      {
        envHash: {
          processEnv: extraProcessEnv
        },
        expected: extraProcessEnv,
      },
      {
        envHash: {
          dotenv: stagingDotenv,
          processEnv: extraProcessEnv
        },
        expected: extraProcessEnv,
      },
    ]

    test.each(cases)('$envHash', ({
      envHash,
      expected
    }) => {
      const env = envHash
        ? new Environment(envHash)
        : new Environment()

      expect(env.processEnv.NODE_ENV).toEqual(expected.NODE_ENV)
      expect(env.processEnv.APP_NAME).toEqual(expected.APP_NAME)
    })
  })

  describe('#env', () => {
    const cases = [
      {
        envHash: null,
        expected: {
          ...developmentDotenv,
          ...developmentProcessEnv,
        },
      },
      {
        envHash: {},
        expected: {
          ...developmentDotenv,
          ...developmentProcessEnv,
        },
      },
      {
        envHash: {
          dotenv: extraDotenv
        },
        expected: {
          ...extraDotenv,
          ...developmentProcessEnv,
        },
      },
      {
        envHash: {
          processEnv: extraProcessEnv
        },
        expected: {
          ...extraDotenv,
          ...extraProcessEnv,
        },
      },
      {
        envHash: {
          dotenv: stagingDotenv,
          processEnv: extraProcessEnv
        },
        expected: {
          ...stagingDotenv,
          ...extraProcessEnv,
        },
      },
    ]

    test.each(cases)('$envHash, $expected', ({
      envHash,
      expected
    }) => {
      const env = envHash
        ? new Environment(envHash)
        : new Environment()

      expect(env.env.NODE_ENV).toEqual(expected.NODE_ENV)
      expect(env.env.APP_NAME).toEqual(expected.APP_NAME)
      expect(env.env.API_HOST).toEqual(expected.API_HOST)
      expect(env.env.API_KEY).toEqual(expected.API_KEY)
    })
  })

  describe('#env to overwrite App Name', () => {
    const APP_NAME_EXPORTED_IN_TERMINAL = 'App Name Exported in Terminal'

    const cases = [
      {
        envHash: null,
        expected: APP_NAME_EXPORTED_IN_TERMINAL,
      },
      {
        envHash: {},
        expected: APP_NAME_EXPORTED_IN_TERMINAL,
      },
      {
        envHash: {
          dotenv: {
            ...extraDotenv,
            APP_NAME: 'App Name will be overwritten',
          }
        },
        expected: APP_NAME_EXPORTED_IN_TERMINAL,
      },
      {
        envHash: {
          processEnv: {
            ...extraProcessEnv,
            APP_NAME: 'App Name will be shown 001'
          }
        },
        expected: 'App Name will be shown 001',
      },
      {
        envHash: {
          dotenv: {
            ...stagingDotenv,
            APP_NAME: 'App Name will be overwritten',
          },
          processEnv: {
            ...extraProcessEnv,
            APP_NAME: 'App Name will be shown 002'
          }
        },
        expected: 'App Name will be shown 002',
      },
    ]

    test.each(cases)('$envHash, $expected', ({
      envHash,
      expected
    }) => {
      const env = envHash
        ? new Environment(envHash)
        : new Environment()

      expect(env.env.APP_NAME).toEqual(expected)
    })
  })

  describe('#env to throw exception with unknown key', () => {
    const cases = [
      ['UNKNOWN_KEY', 'environment variable is not defined [UNKNOWN_KEY]'],
      ['NONE_KEY', 'environment variable is not defined [NONE_KEY]'],
    ]

    test.each(cases)('%s', (key, errorMessage) => {
      const env = new Environment()

      expect(() => env.env[key])
        .toThrowError(errorMessage)
    })
  })

  describe('.createEnv()', () => {
    const cases = [
      {
        envHash: null,
        expected: {
          ...developmentDotenv,
          ...developmentProcessEnv,
        },
      },
      {
        envHash: {},
        expected: {
          ...developmentDotenv,
          ...developmentProcessEnv,
        },
      },
      {
        envHash: {
          dotenv: extraDotenv
        },
        expected: {
          ...extraDotenv,
          ...developmentProcessEnv,
        },
      },
      {
        envHash: {
          processEnv: extraProcessEnv
        },
        expected: {
          ...extraDotenv,
          ...extraProcessEnv,
        },
      },
      {
        envHash: {
          dotenv: stagingDotenv,
          processEnv: extraProcessEnv
        },
        expected: {
          ...stagingDotenv,
          ...extraProcessEnv,
        },
      },
    ]

    test.each(cases)('$envHash, $expected', ({
      envHash,
      expected
    }) => {
      const env = envHash
        ? Environment.createEnv(envHash)
        : Environment.createEnv()

      expect(env.NODE_ENV).toEqual(expected.NODE_ENV)
      expect(env.APP_NAME).toEqual(expected.APP_NAME)
      expect(env.API_HOST).toEqual(expected.API_HOST)
      expect(env.API_KEY).toEqual(expected.API_KEY)
    })
  })

  describe('#NODE_ENV', () => {
    const cases = [
      [null, 'development'],
      ['development', 'development'],
      ['staging', 'staging'],
      ['extra', 'extra'],
    ]

    test.each(cases)('%s', (nodeEnv, expectedNodeEnv) => {
      const env = nodeEnv
        ? new Environment({
          processEnv: {
            NODE_ENV: nodeEnv
          }
        })
        : new Environment()

      expect(env.NODE_ENV).toBe(expectedNodeEnv)
    })
  })

  describe('#createProxyEnv()', () => {
    const cases = [
      {
        envHash: null,
        expected: {
          ...developmentDotenv,
          ...developmentProcessEnv,
        },
      },
      {
        envHash: {},
        expected: {
          ...developmentDotenv,
          ...developmentProcessEnv,
        },
      },
      {
        envHash: {
          dotenv: extraDotenv
        },
        expected: {
          ...extraDotenv,
          ...developmentProcessEnv,
        },
      },
      {
        envHash: {
          processEnv: extraProcessEnv
        },
        expected: {
          ...extraDotenv,
          ...extraProcessEnv,
        },
      },
      {
        envHash: {
          dotenv: stagingDotenv,
          processEnv: extraProcessEnv
        },
        expected: {
          ...stagingDotenv,
          ...extraProcessEnv,
        },
      },
    ]

    test.each(cases)('%o', ({
      envHash,
      expected
    }) => {
      const env = envHash
        ? new Environment(envHash)
        : new Environment()

      const proxyEnv = env.createProxyEnv()

      expect(proxyEnv.NODE_ENV).toEqual(expected.NODE_ENV)
      expect(proxyEnv.APP_NAME).toEqual(expected.APP_NAME)
      expect(proxyEnv.API_HOST).toEqual(expected.API_HOST)
      expect(proxyEnv.API_KEY).toEqual(expected.API_KEY)
    })
  })
})
