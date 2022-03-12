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
})
