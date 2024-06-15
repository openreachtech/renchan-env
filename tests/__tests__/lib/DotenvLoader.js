// @ts-check
'use strict'

const ConstructorSpyGenerator = require('@openreachtech/renchan-test-tools/lib/spyTools/ConstructorSpyGenerator')
const DotenvLoader = require('../../../lib/DotenvLoader')

describe('DotenvLoader', () => {
  describe('constructor', () => {
    describe('to keep property', () => {
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
          const loader = new DotenvLoader(args)

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

        expect(loader)
          .toBeInstanceOf(DotenvLoader)
      })
    })

    describe('to call constructor', () => {
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
        const DotenvLoaderSpy = ConstructorSpyGenerator.create({ jest })
          .generateSpyKitClass(DotenvLoader)

        DotenvLoaderSpy.create(args)

        expect(DotenvLoaderSpy.__spy__)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

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
        const loader = new DotenvLoader(args)

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
        const loader = new DotenvLoader(args)

        expect(loader.resolveDotenvPath().endsWith(expected)).toBeTruthy()
      })

      test('NODE_ENV: production', () => {
        const loader = new DotenvLoader({
          nodeEnv: 'production',
        })

        expect(loader.resolveDotenvPath()).toBeNull()
      })
    })
  })
})

describe('DotenvLoader', () => {
  describe('#createDotenvOptions()', () => {
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
        const loader = new DotenvLoader(args)

        expect(() => loader.createDotenvOptions())
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
        const loader = new DotenvLoader(args)

        expect(loader.createDotenvOptions().path.endsWith(expected)).toBeTruthy()
      })

      test('NODE_ENV: production', () => {
        const loader = new DotenvLoader({
          nodeEnv: 'production',
        })

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
          args: {
            nodeEnv: 'notfound',
          },
          expected: /^ENOENT: no such file or directory, open /u,
        },
      ]

      test.each(cases)('nodeEnv: $args.nodeEnv', ({ args, expected }) => {
        const loader = new DotenvLoader(args)

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
            API_KEY: 'uhyouhyo',
          },
        },
        {
          args: {
            nodeEnv: 'development',
          },
          expected: {
            API_HOST: 'dev.openreach.tech',
            API_KEY: 'devdev',
          },
        },
        {
          args: {
            nodeEnv: 'staging',
          },
          expected: {
            API_HOST: 'staging.openreach.tech',
            API_KEY: 'staginguhyo',
          },
        },
        {
          args: {
            nodeEnv: 'extra',
          },
          expected: {
            API_HOST: 'extra.openreach.tech',
            API_KEY: 'extraextra',
          },
        },
      ]

      test.each(cases)('nodeEnv: $args.nodeEnv', ({ args, expected }) => {
        const loader = new DotenvLoader(args)

        expect(loader.loadConfig())
          .toEqual(expected)
      })
    })
  })
})

describe('DotenvLoader', () => {

  describe('.load()', () => {
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
        expect(() => DotenvLoader.load(args.nodeEnv))
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
            API_KEY: 'uhyouhyo',
          },
        },
        {
          args: {
            nodeEnv: 'development',
          },
          expected: {
            API_HOST: 'dev.openreach.tech',
            API_KEY: 'devdev',
          },
        },
        {
          args: {
            nodeEnv: 'staging',
          },
          expected: {
            API_HOST: 'staging.openreach.tech',
            API_KEY: 'staginguhyo',
          },
        },
        {
          args: {
            nodeEnv: 'extra',
          },
          expected: {
            API_HOST: 'extra.openreach.tech',
            API_KEY: 'extraextra',
          },
        },
      ]

      test.each(cases)('nodeEnv: $args.nodeEnv', ({ args, expected }) => {
        expect(DotenvLoader.load(args.nodeEnv)).toEqual(expected)
      })
    })
  })
})
