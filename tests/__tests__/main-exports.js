'use strict'

const mainExports = require('../../index')

const DotenvLoader = require('../../lib/DotenvLoader')
const EnvironmentHandler = require('../../lib/EnvironmentFacade')
const EnvironmentResolver = require('../../lib/EnvironmentResolver')

describe('main exports', () => {
  const cases = [
    {
      args: {
        ExportedClass: DotenvLoader,
      },
    },
    {
      args: {
        ExportedClass: EnvironmentHandler,
      },
    },
    {
      args: {
        ExportedClass: EnvironmentResolver,
      },
    }
  ]

  test.each(cases)('class: $args.ExportedClass.name', ({ args }) => {
    const targetClass = args.ExportedClass

    expect(mainExports)
      .toHaveProperty(targetClass.name, targetClass)
  })
})
