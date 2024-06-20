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
