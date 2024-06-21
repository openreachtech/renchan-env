'use strict'

const EnvironmentHandler = require('../../../lib/EnvironmentHandler')
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
