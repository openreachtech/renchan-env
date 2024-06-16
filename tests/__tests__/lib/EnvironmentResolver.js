'use strict'

const dotenv = require('dotenv')

const ConstructorSpyGenerator = require('@openreachtech/renchan-test-tools/lib/spyTools/ConstructorSpyGenerator')

const EnvironmentResolver = require('../../../lib/EnvironmentResolver')

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
        {
          args: {
            loadedDotenv: developmentDotenv,
            // processEnv: developmentProcessEnv,
          },
        },
        {
          args: {
            loadedDotenv: extraDotenv,
            // processEnv: extraProcessEnv,
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
      describe('with process.env', () => {
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
          const EnvironmentResolverSpy = ConstructorSpyGenerator.create({ jest })
            .generateSpyKitClass(EnvironmentResolver)

            EnvironmentResolverSpy.create(args)

          expect(EnvironmentResolverSpy.__spy__)
            .toHaveBeenCalledWith(args)
        })
      })

      describe('without process.env', () => {
        const cases = [
          {
            args: {
              loadedDotenv: developmentDotenv,
              // processEnv: developmentProcessEnv,
            },
            expected: {
              loadedDotenv: developmentDotenv,
              processEnv: process.env,
            },
          },
          {
            args: {
              loadedDotenv: extraDotenv,
              // processEnv: extraProcessEnv,
            },
            expected: {
              loadedDotenv: extraDotenv,
              processEnv: process.env,
            },
          },
        ]

        test.each(cases)('NODE_ENV: $args.processEnv.NODE_ENV', ({ args, expected }) => {
          const EnvironmentResolverSpy = ConstructorSpyGenerator.create({ jest })
            .generateSpyKitClass(EnvironmentResolver)

            EnvironmentResolverSpy.create(args)

          expect(EnvironmentResolverSpy.__spy__)
            .toHaveBeenCalledWith(expected)
        })
      })
    })
  })
})
