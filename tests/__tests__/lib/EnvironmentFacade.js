'use strict'

const EnvironmentHandler = require('../../../lib/EnvironmentFacade')
const EnvironmentResolver = require('../../../lib/EnvironmentResolver')

describe('EnvironmentHandler', () => {
  describe('constructor', () => {
    /** @type {EnvironmentResolver.EnvironmentResolverParams} */
    const resolverArgs = {
      loadedDotenv: {
        API_HOST: 'dev.openreach.tech',
        API_KEY: 'development-api-key',
      },
      processEnv: {
        NODE_ENV: 'development',
        APP_NAME: 'App Name Exported in Terminal',
      },
    }

    const environmentHashMock = new EnvironmentResolver(resolverArgs)
      .createProxyEnv()

    describe('to keep property', () => {
      describe('#environmentHash', () => {
        const cases = [
          {
            args: {
              environmentHash: environmentHashMock,
            },
          },
          {
            args: {
              environmentHash: {
                NODE_ENV: 'extra',
              },
            },
          },
        ]

        test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
          const handler = new EnvironmentHandler(args)

          // NOTE: #environmentHash is Proxy object, thus can not use #toHaveProperty() here.
          expect(handler.environmentHash)
            .toBe(args.environmentHash)
        })
      })
    })
  })
})

describe('EnvironmentHandler', () => {
  describe('.create()', () => {
    describe('to return instance of own class', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'extra',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler)
          .toBeInstanceOf(EnvironmentHandler)
      })

      test('with empty args', () => {
        const handler = EnvironmentHandler.create()

        expect(handler)
          .toBeInstanceOf(EnvironmentHandler)
      })
    })

    describe('to call constructor of own', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'extra',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args }) => {
        const createResolverSpy = jest.spyOn(EnvironmentHandler, 'createResolver')

        EnvironmentHandler.create(args)

        expect(createResolverSpy)
          .toHaveBeenCalledWith(args)
      })

      test('with empty args', () => {
        const expected = {
          processEnv: process.env,
        }

        const createResolverSpy = jest.spyOn(EnvironmentHandler, 'createResolver')

        EnvironmentHandler.create()

        expect(createResolverSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('EnvironmentHandler', () => {
  describe('.createResolver()', () => {
    describe('to return instance of EnvironmentResolver', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'extra',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args }) => {
        const resolver = EnvironmentHandler.createResolver(args)

        expect(resolver)
          .toBeInstanceOf(EnvironmentResolver)
      })
    })

    describe('to call EnvironmentResolver.create()', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'extra',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args }) => {
        const createSpy = jest.spyOn(EnvironmentResolver, 'create')

        EnvironmentHandler.createResolver(args)

        expect(createSpy)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('EnvironmentHandler', () => {
  describe('#get:env', () => {
    const cases = [
      {
        args: {
          environmentHash: {
            NODE_ENV: 'development',
          },
        },
      },
      {
        args: {
          environmentHash: {
            NODE_ENV: 'extra',
          },
        },
      },
    ]

    test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
      const handler = new EnvironmentHandler(args)

      const actual = handler.env

      expect(actual)
        .toBe(args.environmentHash) // same reference
    })
  })
})

describe('EnvironmentHandler', () => {
  describe('#get:nodeEnv', () => {
    describe('to return presented value', () => {
      const cases = [
        {
          args: {
            environmentHash: {
              NODE_ENV: 'production',
            },
          },
          expected: 'production',
        },
        {
          args: {
            environmentHash: {
              NODE_ENV: 'development',
            },
          },
          expected: 'development',
        },
        {
          args: {
            environmentHash: {
              NODE_ENV: 'extra',
            },
          },
          expected: 'extra',
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args, expected }) => {
        const handler = new EnvironmentHandler(args)

        const actual = handler.nodeEnv

        expect(actual)
          .toBe(expected)
      })
    })

    describe('to return no-presented value', () => {
      const cases = [
        {
          args: {
            environmentHash: undefined,
          },
        },
        {
          args: {
            environmentHash: null,
          },
        },
        {
          args: {
            environmentHash: {
              // NODE_ENV: 'production',
            },
          },
        },
      ]

      test.each(cases)('environmentHash: $args.environmentHash', ({ args, expected }) => {
        const handler = new EnvironmentHandler(args)

        const actual = handler.nodeEnv

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('EnvironmentHandler', () => {
  describe('#isProduction()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'production',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler.isProduction())
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'extra',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'staging',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler.isProduction())
          .toBeFalsy()
      })
    })
  })
})

describe('EnvironmentHandler', () => {
  describe('#isDevelopment()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler.isDevelopment())
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'production',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'extra',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'staging',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler.isDevelopment())
          .toBeFalsy()
      })
    })
  })
})

describe('EnvironmentHandler', () => {
  describe('#isStaging()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'staging',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler.isStaging())
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'production',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'extra',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler.isStaging())
          .toBeFalsy()
      })
    })
  })
})

describe('EnvironmentHandler', () => {
  describe('#isLive()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'live',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler.isLive())
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'production',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'staging',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'extra',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler.isLive())
          .toBeFalsy()
      })
    })
  })
})

describe('EnvironmentHandler', () => {
  describe('#isPreProduction()', () => {
    describe('to be truthy', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'extra',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'staging',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler.isPreProduction())
          .toBeTruthy()
      })
    })

    describe('to be falsy', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'production',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.environmentHash.NODE_ENV', ({ args }) => {
        const handler = EnvironmentHandler.create(args)

        expect(handler.isPreProduction())
          .toBeFalsy()
      })
    })
  })
})

describe('EnvironmentHandler', () => {
  describe('#generateFacade()', () => {
    describe('to contain #environmentHash', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
          expected: {
            environmentHash: {
              NODE_ENV: 'development',

              API_HOST: 'dev.openreach.tech',
              API_KEY: 'development-api-key',
            },
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'extra',
            },
          },
          expected: {
            environmentHash: {
              NODE_ENV: 'extra',

              API_HOST: 'extra.openreach.tech',
              API_KEY: 'extra-api-key',
            },
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args, expected }) => {
        const handler = EnvironmentHandler.create(args)

        const actual = handler.generateFacade()

        // NOTE: #environmentHash is Proxy object, thus can not use #toHaveProperty() here.
        expect(actual)
          .toHaveProperty('NODE_ENV', expected.environmentHash.NODE_ENV)
        expect(actual)
          .toHaveProperty('API_HOST', expected.environmentHash.API_HOST)
        expect(actual)
          .toHaveProperty('API_KEY', expected.environmentHash.API_KEY)
      })
    })

    describe('to contain methods of checking NODE_ENV', () => {
      const cases = [
        {
          args: {
            processEnv: {
              NODE_ENV: 'development',
            },
          },
          expected: {
            isProduction: false,
            isDevelopment: true,
            isStaging: false,
            isLive: false,
            isPreProduction: true,
          },
        },
        {
          args: {
            processEnv: {
              NODE_ENV: 'production',
            },
          },
          expected: {
            isProduction: true,
            isDevelopment: false,
            isStaging: false,
            isLive: false,
            isPreProduction: false,
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args, expected }) => {
        const handler = EnvironmentHandler.create(args)

        /** @type {object} */
        const actual = handler.generateFacade()

        expect(actual.isProduction())
          .toBe(expected.isProduction)
        expect(actual.isDevelopment())
          .toBe(expected.isDevelopment)
        expect(actual.isStaging())
          .toBe(expected.isStaging)
        expect(actual.isLive())
          .toBe(expected.isLive)
        expect(actual.isPreProduction())
          .toBe(expected.isPreProduction)
      })
    })

    describe('to throw by calling not existing member', () => {
      const cases = [
        {
          args: {
            key: 'ALPHA_VALUE',
          },
          expected: new Error('environment variable is not defined [ALPHA_VALUE]'),
        },
        {
          args: {
            key: 'BETA_VALUE',
          },
          expected: new Error('environment variable is not defined [BETA_VALUE]'),
        },
      ]

      test.each(cases)('key: $args.key', ({ args, expected }) => {
        const handler = EnvironmentHandler.create({
          processEnv: {
            NODE_ENV: 'development',
          },
        })

        /** @type {object} */
        const actual = handler.generateFacade()

        expect(() => actual[args.key])
          .toThrow(expected)
      })
    })
  })
})
