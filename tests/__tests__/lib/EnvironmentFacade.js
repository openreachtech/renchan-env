'use strict'

const EnvironmentFacade = require('../../../lib/EnvironmentFacade')
const EnvironmentResolver = require('../../../lib/EnvironmentResolver')

describe('EnvironmentFacade', () => {
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
          const facade = new EnvironmentFacade(args)

          // NOTE: #environmentHash is Proxy object, thus can not use #toHaveProperty() here.
          expect(facade.environmentHash)
            .toBe(args.environmentHash)
        })
      })
    })
  })
})

describe('EnvironmentFacade', () => {
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
        const facade = EnvironmentFacade.create(args)

        expect(facade)
          .toBeInstanceOf(EnvironmentFacade)
      })

      test('with empty args', () => {
        const facade = EnvironmentFacade.create()

        expect(facade)
          .toBeInstanceOf(EnvironmentFacade)
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
        const createResolverSpy = jest.spyOn(EnvironmentFacade, 'createResolver')

        EnvironmentFacade.create(args)

        expect(createResolverSpy)
          .toHaveBeenCalledWith(args)
      })

      test('with empty args', () => {
        const expected = {
          processEnv: process.env,
        }

        const createResolverSpy = jest.spyOn(EnvironmentFacade, 'createResolver')

        EnvironmentFacade.create()

        expect(createResolverSpy)
          .toHaveBeenCalledWith(expected)
      })
    })
  })
})

describe('EnvironmentFacade', () => {
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
        const resolver = EnvironmentFacade.createResolver(args)

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

        EnvironmentFacade.createResolver(args)

        expect(createSpy)
          .toHaveBeenCalledWith(args)
      })
    })
  })
})

describe('EnvironmentFacade', () => {
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
      const facade = new EnvironmentFacade(args)

      const actual = facade.env

      expect(actual)
        .toBe(args.environmentHash) // same reference
    })
  })
})

describe('EnvironmentFacade', () => {
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
        const facade = new EnvironmentFacade(args)

        const actual = facade.nodeEnv

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
        const facade = new EnvironmentFacade(args)

        const actual = facade.nodeEnv

        expect(actual)
          .toBeNull()
      })
    })
  })
})

describe('EnvironmentFacade', () => {
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
        const facade = EnvironmentFacade.create(args)

        expect(facade.isProduction())
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
        const facade = EnvironmentFacade.create(args)

        expect(facade.isProduction())
          .toBeFalsy()
      })
    })
  })
})

describe('EnvironmentFacade', () => {
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
        const facade = EnvironmentFacade.create(args)

        expect(facade.isDevelopment())
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
        const facade = EnvironmentFacade.create(args)

        expect(facade.isDevelopment())
          .toBeFalsy()
      })
    })
  })
})

describe('EnvironmentFacade', () => {
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
        const facade = EnvironmentFacade.create(args)

        expect(facade.isStaging())
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
        const facade = EnvironmentFacade.create(args)

        expect(facade.isStaging())
          .toBeFalsy()
      })
    })
  })
})

describe('EnvironmentFacade', () => {
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
        const facade = EnvironmentFacade.create(args)

        expect(facade.isLive())
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
        const facade = EnvironmentFacade.create(args)

        expect(facade.isLive())
          .toBeFalsy()
      })
    })
  })
})

describe('EnvironmentFacade', () => {
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
        const facade = EnvironmentFacade.create(args)

        expect(facade.isPreProduction())
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
        const facade = EnvironmentFacade.create(args)

        expect(facade.isPreProduction())
          .toBeFalsy()
      })
    })
  })
})

describe('EnvironmentFacade', () => {
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
        const facade = EnvironmentFacade.create(args)

        const actual = facade.generateFacade()

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
        const facade = EnvironmentFacade.create(args)

        /** @type {object} */
        const actual = facade.generateFacade()

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
        const facade = EnvironmentFacade.create({
          processEnv: {
            NODE_ENV: 'development',
          },
        })

        /** @type {object} */
        const actual = facade.generateFacade()

        expect(() => actual[args.key])
          .toThrow(expected)
      })
    })
  })
})
