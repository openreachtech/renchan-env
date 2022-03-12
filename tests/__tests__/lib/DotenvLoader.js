// @ts-check
'use strict'

const DotenvLoader = require('../../../lib/DotenvLoader')

describe('DotenvLoader', () => {
  describe('#resolveDotenvPath()', () => {
    describe('throw exception', () => {
      const cases = [
        null,
        undefined,
        '',
      ]

      test.each(cases)('%s', (nodeEnv) => {
        const env = new DotenvLoader(nodeEnv)

        expect(() => env.resolveDotenvPath())
          .toThrowError('no NODE_ENV')
      })
    })

    describe('with NODE_ENV', () => {
      const cases = [
        ['development', '/.env.development'],
        ['staging', '/.env.staging'],
        ['extra', '/.env.extra'],
      ]

      test.each(cases)('%s', (nodeEnv, fileName) => {
        const env = new DotenvLoader(nodeEnv)

        expect(env.resolveDotenvPath().endsWith(fileName)).toBeTruthy()
      })

      test('NODE_ENV: production', () => {
        const env = new DotenvLoader('production')

        expect(env.resolveDotenvPath()).toBeNull()
      })
    })
  })

  describe('#createDotenvOptions()', () => {
    describe('throw exception', () => {
      const cases = [
        null,
        undefined,
        '',
      ]

      test.each(cases)('%s', (nodeEnv) => {
        const env = new DotenvLoader(nodeEnv)

        expect(() => env.createDotenvOptions())
          .toThrowError('no NODE_ENV')
      })
    })

    describe('with NODE_ENV', () => {
      const cases = [
        ['development', '/.env.development'],
        ['staging', '/.env.staging'],
        ['extra', '/.env.extra'],
      ]

      test.each(cases)('%s', (nodeEnv, fileName) => {
        const env = new DotenvLoader(nodeEnv)

        expect(env.createDotenvOptions().path.endsWith(fileName)).toBeTruthy()
      })

      test('NODE_ENV: production', () => {
        const env = new DotenvLoader('production')

        expect(env.createDotenvOptions()).toEqual({})
      })
    })
  })

  describe('#loadConfig()', () => {
    describe('throw exception', () => {
      const cases = [
        {
          nodeEnv: 'notfound',
          errorPattern: /^ENOENT: no such file or directory, open /
        },
      ]

      test.each(cases)('%s', ({
        nodeEnv,
        errorPattern,
      }) => {
        const env = new DotenvLoader(nodeEnv)

        expect(() => env.loadConfig())
          .toThrowError(errorPattern)
      })
    })

    describe('with NODE_ENV', () => {
      const cases = [
        {
          nodeEnv: 'production',
          envBody: {
            API_HOST: 'openreach.tech',
            API_KEY: 'uhyouhyo',
          }
        },
        {
          nodeEnv: 'development',
          envBody: {
            API_HOST: 'dev.openreach.tech',
            API_KEY: 'devdev',
          }
        },
        {
          nodeEnv: 'staging',
          envBody: {
            API_HOST: 'staging.openreach.tech',
            API_KEY: 'staginguhyo',
          }
        },
        {
          nodeEnv: 'extra',
          envBody: {
            API_HOST: 'extra.openreach.tech',
            API_KEY: 'extraextra',
          }
        },
      ]

      test.each(cases)('%s', ({
        nodeEnv,
        envBody
      }) => {
        const env = new DotenvLoader(nodeEnv)

        expect(env.loadConfig()).toEqual(envBody)
      })
    })
  })
})
