'use strict'

const dotenv = require('dotenv')

const ConstructorSpyGenerator = require('@openreachtech/renchan-test-tools/lib/spyTools/ConstructorSpyGenerator')

const EnvironmentResolver = require('../../../lib/EnvironmentResolver')
const DotenvLoader = require('../../../lib/DotenvLoader')

describe('EnvironmentResolver', () => {
  describe('constructor', () => {
    /** @type {dotenv.DotenvParseOutput} */
    const developmentDotenv = {
      API_HOST: 'dev.openreach.tech',
      API_KEY: 'development-api-key',
    }

    /** @type {dotenv.DotenvParseOutput} */
    const extraDotenv = {
      API_HOST: 'extra.openreach.tech',
      API_KEY: 'extra-api-key',
    }

    /** @type {typeof globalThis.process.env} */
    const developmentProcessEnv = {
      NODE_ENV: 'development',
      APP_NAME: 'App Name Exported in Terminal',
    }

    /** @type {typeof globalThis.process.env} */
    const extraProcessEnv = {
      NODE_ENV: 'extra',
      APP_NAME: 'App Name as Extra in test',
    }

    describe('to keep property', () => {
      describe('#loadedDotenv', () => {
        /**
         * @type {Array<{
         *   args: EnvironmentResolver.EnvironmentResolverParams,
         * }>}
         */
        const cases = [
          {
            args: {
              loadedDotenv: developmentDotenv,
              processEnv: developmentProcessEnv,
            },
          },
          {
            args: {
              loadedDotenv: extraDotenv,
              processEnv: extraProcessEnv,
            },
          },
        ]

        test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args }) => {
          const resolver = new EnvironmentResolver(args)

          expect(resolver)
            .toHaveProperty('loadedDotenv', args.loadedDotenv)
        })
      })

      describe('#processEnv', () => {
        /**
         * @type {Array<{
         *   args: EnvironmentResolver.EnvironmentResolverParams,
         * }>}
         */
        const cases = [
          {
            args: {
              loadedDotenv: developmentDotenv,
              processEnv: developmentProcessEnv,
            },
          },
          {
            args: {
              loadedDotenv: extraDotenv,
              processEnv: extraProcessEnv,
            },
          },
        ]

        test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args }) => {
          const resolver = new EnvironmentResolver(args)

          expect(resolver)
            .toHaveProperty('processEnv', args.processEnv)
        })
      })
    })
  })
})

describe('EnvironmentResolver', () => {
  describe('.create()', () => {
    /** @type {dotenv.DotenvParseOutput} */
    const developmentDotenv = {
      API_HOST: 'dev.openreach.tech',
      API_KEY: 'development-api-key',
    }

    /** @type {dotenv.DotenvParseOutput} */
    const extraDotenv = {
      API_HOST: 'extra.openreach.tech',
      API_KEY: 'extra-api-key',
    }

    /** @type {typeof globalThis.process.env} */
    const developmentProcessEnv = {
      NODE_ENV: 'development',
      APP_NAME: 'App Name Exported in Terminal',
    }

    /** @type {typeof globalThis.process.env} */
    const extraProcessEnv = {
      NODE_ENV: 'extra',
      APP_NAME: 'App Name as Extra in test',
    }

    describe('to return instance of own class', () => {
      const cases = [
        {
          args: {
            processEnv: developmentProcessEnv,
          },
        },
        {
          args: {
            processEnv: extraProcessEnv,
          },
        },
      ]

      test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args }) => {
        const resolver = EnvironmentResolver.create(args)

        expect(resolver)
          .toBeInstanceOf(EnvironmentResolver)
      })
    })

    describe('to call constructor', () => {
      describe('with processEnv', () => {
        const cases = [
          {
            args: {
              processEnv: developmentProcessEnv,
            },
            tally: {
              loadedDotenv: developmentDotenv,
            },
          },
          {
            args: {
              processEnv: extraProcessEnv,
            },
            tally: {
              loadedDotenv: extraDotenv,
            },
          },
        ]

        test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args, tally }) => {
          const loadDotenvSpy = jest.spyOn(EnvironmentResolver, 'loadDotenv')
            .mockReturnValue(tally.loadedDotenv)
          const expected = {
            loadedDotenv: tally.loadedDotenv,
            processEnv: args.processEnv,
          }

          const EnvironmentResolverSpy = ConstructorSpyGenerator.create({ jest })
            .generateSpyKitClass(EnvironmentResolver)

          EnvironmentResolverSpy.create(args)

          expect(EnvironmentResolverSpy.__spy__)
            .toHaveBeenCalledWith(expected)

          loadDotenvSpy.mockRestore()
        })
      })

      describe('without processEnv', () => {
        test('args: {}', () => {
          const args = {}
          const expected = {
            loadedDotenv: developmentDotenv,
            processEnv: process.env,
          }

          const EnvironmentResolverSpy = ConstructorSpyGenerator.create({ jest })
            .generateSpyKitClass(EnvironmentResolver)

          EnvironmentResolverSpy.create(args)

          expect(EnvironmentResolverSpy.__spy__)
            .toHaveBeenCalledWith(expected)
        })

        test('args: undefined', () => {
          const expected = {
            loadedDotenv: developmentDotenv,
            processEnv: process.env,
          }

          const EnvironmentResolverSpy = ConstructorSpyGenerator.create({ jest })
            .generateSpyKitClass(EnvironmentResolver)

          EnvironmentResolverSpy.create()

          expect(EnvironmentResolverSpy.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})

describe('EnvironmentResolver', () => {
  describe('.loadDotenv()', () => {
    describe('to call member of DotenvLoader', () => {
      const cases = [
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

      test.each(cases)('NODE_ENV: $args.nodeEnv', ({ args }) => {
        const loadedDotenvTally = {
          NODE_ENV: args.nodeEnv,
        }

        /** @type {DotenvLoader} */
        const mockLoader = /** @type {*} */ ({
          loadConfig: () => loadedDotenvTally,
        })

        const createSpy = jest.spyOn(DotenvLoader, 'create')
          .mockReturnValue(mockLoader)

        const actual = EnvironmentResolver.loadDotenv(args)

        expect(actual)
          .toBe(loadedDotenvTally) // same reference

        expect(createSpy)
          .toHaveBeenCalledWith(args)

        createSpy.mockRestore()
      })
    })

    describe('to return actual loaded dotenv', () => {
      const cases = [
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
            nodeEnv: 'production',
          },
          expected: {
            API_HOST: 'openreach.tech',
            API_KEY: 'production-api-key',
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
        const actual = EnvironmentResolver.loadDotenv(args)

        expect(actual)
          .toEqual(expected)
      })
    })
  })
})
