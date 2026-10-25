'use strict'

const fs = require('fs')
const path = require('path')

const mainExports = require('../../index')

describe('modules of lib/ and main exports', () => {
  describe('main exports', () => {
    describe('should have a module file in lib/', () => {
      const cases = [
        {
          expected: 'DotenvLoader.js',
        },
        {
          expected: 'EnvironmentFacade.js',
        },
        {
          expected: 'EnvironmentResolver.js',
        },
        {
          expected: 'ValueSeparator.js',
        },
      ]

      test.each(cases)('expected: $expected', ({ expected }) => {
        const received = fs.readdirSync(path.join(__dirname, '../../lib'))

        expect(received)
          .toContain(expected)
      })
    })
  })

  describe('files of lib/', () => {
    describe('should be only the modules main exports', () => {
      test('count of files', () => {
        const received = fs.readdirSync(path.join(__dirname, '../../lib'))

        const expected = Object.keys(mainExports)

        expect(received)
          .toHaveLength(expected.length)
      })
    })
  })
})
