'use strict'

const dotenv = require('dotenv')

const DotenvLoader = require('../../../lib/DotenvLoader')

describe('DotenvLoader', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
      describe('#dotenvHandler', () => {
        /**
         * @type {Array<{
         *   args: {
         *     dotenvHandler: dotenv
         *   }
         * }>}
         */
        const cases = /** @type {Array<object>} */ ([
          {
            args: {
              dotenvHandler: dotenv,
            },
          },
          {
            args: {
              dotenvHandler: {},
            },
          },
        ])

        test.each(cases)('dotenvHandler: $args.dotenvHandler', ({ args }) => {
          const targetArgs = {
            dotenvHandler: args.dotenvHandler,
            nodeEnv: 'extra',
          }

          const loader = new DotenvLoader(targetArgs)

          expect(loader)
            .toHaveProperty('dotenvHandler', args.dotenvHandler)
        })
      })

      describe('#nodeEnv', () => {
        const cases = [
          {
            args: {
              nodeEnv: 'production',
            },
          },
          {
            args: {
              nodeEnv: 'development',
            },
          },
          {
            args: {
              nodeEnv: 'staging',
            },
          },
          {
            args: {
              nodeEnv: 'extra',
            },
          },
        ]

        test.each(cases)('nodeEnv: $args.nodeEnv', ({ args }) => {
          const targetArgs = {
            dotenvHandler: dotenv,
            nodeEnv: args.nodeEnv,
          }

          const loader = new DotenvLoader(targetArgs)

          expect(loader)
            .toHaveProperty('nodeEnv', args.nodeEnv)
        })
      })
    })
  })
})

describe('DotenvLoader', () => {
  describe('.create()', () => {
    describe('to return instance of own class', () => {
      describe('with dotenvHandler', () => {
        const cases = [
          {
            args: {
              dotenvHandler: dotenv,
              nodeEnv: 'production',
            },
          },
          {
            args: {
              dotenvHandler: dotenv,
              nodeEnv: 'development',
            },
          },
          {
            args: {
              dotenvHandler: dotenv,
              nodeEnv: 'staging',
            },
          },
          {
            args: {
              dotenvHandler: dotenv,
              nodeEnv: 'extra',
            },
          },
        ]

        test.each(cases)('nodeEnv: $args.nodeEnv', ({ args }) => {
          const loader = DotenvLoader.create(args)

          expect(loader)
            .toBeInstanceOf(DotenvLoader)
        })
      })

      describe('without dotenvHandler', () => {
        const cases = [
          {
            args: {
              // dotenvHandler: dotenv,
              nodeEnv: 'production',
            },
          },
          {
            args: {
              // dotenvHandler: dotenv,
              nodeEnv: 'development',
            },
          },
          {
            args: {
              // dotenvHandler: dotenv,
              nodeEnv: 'staging',
            },
          },
          {
            args: {
              // dotenvHandler: dotenv,
              nodeEnv: 'extra',
            },
          },
        ]

        test.each(cases)('nodeEnv: $args.nodeEnv', ({ args }) => {
          const loader = DotenvLoader.create(args)

          expect(loader)
            .toBeInstanceOf(DotenvLoader)
        })
      })
    })

    describe('to call constructor', () => {
      describe('with dotenvHandler', () => {
        const cases = [
          {
            args: {
              dotenvHandler: dotenv,
              nodeEnv: 'production',
            },
          },
          {
            args: {
              dotenvHandler: dotenv,
              nodeEnv: 'development',
            },
          },
          {
            args: {
              dotenvHandler: dotenv,
              nodeEnv: 'staging',
            },
          },
          {
            args: {
              dotenvHandler: dotenv,
              nodeEnv: 'extra',
            },
          },
        ]

        test.each(cases)('nodeEnv: $args.nodeEnv', ({ args }) => {
          const DotenvLoaderSpy = constructorSpy.spyOn(DotenvLoader)

          DotenvLoaderSpy.create(args)

          expect(DotenvLoaderSpy.__spy__)
            .toHaveBeenCalledWith(args)
        })
      })

      describe('without dotenvHandler', () => {
        const cases = [
          {
            args: {
              nodeEnv: 'production',
            },
            expected: {
              dotenvHandler: dotenv,
              nodeEnv: 'production',
            },
          },
          {
            args: {
              nodeEnv: 'development',
            },
            expected: {
              dotenvHandler: dotenv,
              nodeEnv: 'development',
            },
          },
          {
            args: {
              nodeEnv: 'staging',
            },
            expected: {
              dotenvHandler: dotenv,
              nodeEnv: 'staging',
            },
          },
          {
            args: {
              nodeEnv: 'extra',
            },
            expected: {
              dotenvHandler: dotenv,
              nodeEnv: 'extra',
            },
          },
        ]

        test.each(cases)('nodeEnv: $args.nodeEnv', ({ args, expected }) => {
          const DotenvLoaderSpy = constructorSpy.spyOn(DotenvLoader)

          DotenvLoaderSpy.create(args)

          expect(DotenvLoaderSpy.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})

describe('DotenvLoader', () => {
  describe('#resolveDotenvPath()', () => {
    describe('throw exception', () => {
      /**
       * @type {Array<{
       *   args: DotenvLoader.DotenvLoaderFactoryParams
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
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
        const loader = DotenvLoader.create(args)

        expect(() => loader.resolveDotenvPath())
          .toThrowError('no NODE_ENV')
      })
    })

    describe('with NODE_ENV', () => {
      /**
       * @type {Array<{
       *   args: DotenvLoader.DotenvLoaderFactoryParams
       *   expected: RegExp
       * }>}
       */
      const cases = /** @type {Array<*>} */ ([
        {
          args: {
            nodeEnv: 'development',
          },
          expected: /\.env\.development$/u,
        },
        {
          args: {
            nodeEnv: 'staging',
          },
          expected: /\.env\.staging$/u,
        },
        {
          args: {
            nodeEnv: 'extra',
          },
          expected: /\.env\.extra$/u,
        },
      ])

      test.each(cases)('nodeEnv: $args.nodeEnv', ({ args, expected }) => {
        const loader = DotenvLoader.create(args)

        const actual = loader.resolveDotenvPath()

        expect(actual)
          .toMatch(expected)
      })

      test('NODE_ENV: production', () => {
        const loader = DotenvLoader.create({
          nodeEnv: 'production',
        })

        const actual = loader.resolveDotenvPath()

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('DotenvLoader', () => {
  describe('#generateDotenvOptions()', () => {
    describe('throw exception', () => {
      /**
       * @type {Array<{
       *   args: DotenvLoader.DotenvLoaderFactoryParams
       * }>}
       */
      const cases = /** @type {Array<object>} */ ([
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
        const loader = DotenvLoader.create(args)

        expect(() => loader.generateDotenvOptions())
          .toThrow('no NODE_ENV')
      })
    })

    describe('with NODE_ENV', () => {
      /**
       * @type {Array<{
       *   args: DotenvLoader.DotenvLoaderFactoryParams
       *   expected: RegExp
       * }>}
       */
      const cases = /** @type {Array<object>} */ ([
        {
          args: {
            nodeEnv: 'development',
          },
          expected: /\.env\.development$/u,
        },
        {
          args: {
            nodeEnv: 'staging',
          },
          expected: /\.env\.staging$/u,
        },
        {
          args: {
            nodeEnv: 'extra',
          },
          expected: /\.env\.extra$/u,
        },
      ])

      test.each(cases)('nodeEnv: $args.nodeEnv', ({ args, expected }) => {
        const loader = DotenvLoader.create(args)

        const actual = loader.generateDotenvOptions()

        expect(actual.path)
          .toMatch(expected)
      })

      test('NODE_ENV: production', () => {
        const loader = DotenvLoader.create({
          nodeEnv: 'production',
        })

        const actual = loader.generateDotenvOptions()

        expect(actual)
          .toEqual({})
      })
    })
  })
})

describe('DotenvLoader', () => {

  describe('#loadConfig()', () => {
    describe('throw exception', () => {
      const cases = [
        {
          args: {
            nodeEnv: 'notfound',
          },
          expected: /^ENOENT: no such file or directory, open /u,
        },
      ]

      test.each(cases)('nodeEnv: $args.nodeEnv', ({ args, expected }) => {
        const loader = DotenvLoader.create(args)

        expect(() => loader.loadConfig())
          .toThrowError(expected)
      })
    })

    describe('with NODE_ENV', () => {
      const cases = [
        {
          args: {
            nodeEnv: 'production',
          },
          expected: {
            API_HOST: 'openreach.tech',
            API_KEY: 'production-api-key',
          },
        },
        {
          args: {
            nodeEnv: 'development',
          },
          expected: {
            API_HOST: 'dev.openreach.tech',
            API_KEY: 'development-api-key',
          },
        },
        {
          args: {
            nodeEnv: 'staging',
          },
          expected: {
            API_HOST: 'staging.openreach.tech',
            API_KEY: 'staging-api-key',
          },
        },
        {
          args: {
            nodeEnv: 'extra',
          },
          expected: {
            API_HOST: 'extra.openreach.tech',
            API_KEY: 'extra-api-key',
          },
        },
      ]

      test.each(cases)('nodeEnv: $args.nodeEnv', ({ args, expected }) => {
        const loader = DotenvLoader.create(args)

        const actual = loader.loadConfig()

        expect(actual)
          .toEqual(expected)
      })
    })

    describe('to call #dotenvHandler', () => {
      const cases = [
        {
          args: {
            nodeEnv: 'production',
          },
        },
        {
          args: {
            nodeEnv: 'development',
          },
        },
        {
          args: {
            nodeEnv: 'staging',
          },
        },
        {
          args: {
            nodeEnv: 'extra',
          },
        },
      ]

      test.each(cases)('nodeEnv: $args.nodeEnv', ({ args }) => {
        const loader = DotenvLoader.create(args)

        const tallyParsed = /** @type {*} */ ({})
        const tallyOptions = /** @type {*} */ ({})
        const tallyDotenv = /** @type {*} */ ({
          parsed: tallyParsed,
        })

        const configSpy = jest.spyOn(loader.dotenvHandler, 'config')
          .mockReturnValue(tallyDotenv)
        const generateDotenvOptionsSpy = jest.spyOn(loader, 'generateDotenvOptions')
          .mockReturnValue(tallyOptions)

        const actual = loader.loadConfig()

        expect(actual)
          .toBe(tallyParsed) // same reference
        expect(configSpy)
          .toHaveBeenCalledWith(tallyOptions)

        configSpy.mockRestore()
        generateDotenvOptionsSpy.mockRestore()
      })
    })
  })
})
