'use strict'

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

/*
 * NOTE:
 * We are checking whether VS Code IntelliSense is effective for `scripts/env.js`,
 * thus no test variations are required in this test.
 */
describe('env.js', () => {
  test('to access defined key of plain `env`', () => {
    const env = require('../../../scripts/env')

    expect(env.NODE_ENV) // NOTE: Should be error here.
      .toBe('development')
    expect(env.API_HOST) // NOTE: Should be error here.
      .toBe('dev.openreach.tech')
    expect(env.API_KEY) // NOTE: Should be error here.
      .toBe('development-api-key')
  })

  test('to access defined key of typed `env`', () => {
    const env = require('../../../app/typed-env')

    expect(env.NODE_ENV)
      .toBe('development')
    expect(env.API_HOST)
      .toBe('dev.openreach.tech')
    expect(env.API_KEY)
      .toBe('development-api-key')
  })

  test('to access not defined key', () => {
    const env = /** @type {Record<string, *>} */ (
      require('../../../app/typed-env')
    )

    const actual = env.UNKNOWN_KEY

    expect(actual)
      .toBeNull()
  })
})
