// @ts-check
'use strict'

const DotenvLoader = require('../../../lib/DotenvLoader')

describe('DotenvLoader', () => {
  describe('#resolveDotenvPath()', () => {
    describe('throw exception', () => {
      /**
       * @type {Array<{
       *   args: {
       *     nodeEnv: string,
       *   },
       * }>}
       */
      const cases = /** @type {*} */ ([
        {
          args: {
            nodeEnv: null,
          },
        },
        {
          args: {
            nodeEnv: undefined,
          },
        },
        {
          args: {
            nodeEnv: '',
          },
        },
      ])

      test.each(cases)('nodeEnv: $args.nodeEnv', ({ args }) => {
        const loader = new DotenvLoader(args.nodeEnv)

        expect(() => loader.resolveDotenvPath())
          .toThrowError('no NODE_ENV')
      })
    })

    describe('with NODE_ENV', () => {
      const cases = [
        {
          args: {
            nodeEnv: 'development',
          },
          expected: '/.env.development',
        },
        {
          args: {
            nodeEnv: 'staging',
          },
          expected: '/.env.staging',
        },
        {
          args: {
            nodeEnv: 'extra',
          },
          expected: '/.env.extra',
        },
      ]

      test.each(cases)('nodeEnv: $args.nodeEnv', ({ args, expected }) => {
        const loader = new DotenvLoader(args.nodeEnv)

        expect(loader.resolveDotenvPath().endsWith(expected)).toBeTruthy()
      })

      test('NODE_ENV: production', () => {
        const loader = new DotenvLoader('production')

        expect(loader.resolveDotenvPath()).toBeNull()
      })
    })
  })
})

describe('DotenvLoader', () => {
  describe('#createDotenvOptions()', () => {
    describe('throw exception', () => {
      const cases = [
        null,
        undefined,
        '',
      ]

      test.each(cases)('%s', (nodeEnv) => {
        const loader = new DotenvLoader(nodeEnv)

        expect(() => loader.createDotenvOptions())
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
        const loader = new DotenvLoader(nodeEnv)

        expect(loader.createDotenvOptions().path.endsWith(fileName)).toBeTruthy()
      })

      test('NODE_ENV: production', () => {
        const loader = new DotenvLoader('production')

        expect(loader.createDotenvOptions()).toEqual({})
      })
    })
  })
})

describe('DotenvLoader', () => {

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
        const loader = new DotenvLoader(nodeEnv)

        expect(() => loader.loadConfig())
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
        const loader = new DotenvLoader(nodeEnv)

        expect(loader.loadConfig()).toEqual(envBody)
      })
    })
  })
})

describe('DotenvLoader', () => {

  describe('.load()', () => {
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
        expect(() => DotenvLoader.load(nodeEnv))
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
        expect(DotenvLoader.load(nodeEnv)).toEqual(envBody)
      })
    })
  })
})
