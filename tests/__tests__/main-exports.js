'use strict'

const mainExports = require('../../index')

const DotenvLoader = require('../../lib/DotenvLoader')
const EnvironmentFacade = require('../../lib/EnvironmentFacade')
const EnvironmentResolver = require('../../lib/EnvironmentResolver')
const ValueSeparator = require('../../lib/ValueSeparator')

describe('main exports', () => {
  const cases = [
    {
      args: {
        ExportedClass: DotenvLoader,
      },
    },
    {
      args: {
        ExportedClass: EnvironmentFacade,
      },
    },
    {
      args: {
        ExportedClass: EnvironmentResolver,
      },
    },
    {
      args: {
        ExportedClass: ValueSeparator,
      },
    },
  ]

  test.each(cases)('class: $args.ExportedClass.name', ({ args }) => {
    const targetClass = args.ExportedClass

    expect(mainExports)
      .toHaveProperty(targetClass.name, targetClass)
  })
})
