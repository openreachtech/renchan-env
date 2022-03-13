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
})
