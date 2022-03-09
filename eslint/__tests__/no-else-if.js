'use strict'

const RuleTester = require('eslint').RuleTester
const noElseIfRule = require('../rules/no-else-if')

const tester = new RuleTester()

describe('ESLint: no-else-if', () => {
  const errors = ['Never use else-if statement.']
  const validCodes = [
    `if (condition) {
      // noop 01
    } else {
      // noop 02
    }`,
  ]
  const invalidCodes = [
    `if (condition) {
      // noop 03
    } else if (subconditions) {
      // noop 04
    }`,
    `if (condition) {
      // noop 05
    } else
    if (subconditions) {
      // noop 06
    }`,
  ]

  // run tester.
  // tester.run(rule-name, rule-defining, test-pattern)
  tester.run(
    'no-else-if',
    noElseIfRule,
    {
      valid: validCodes.map(code => ({ code })),
      invalid: invalidCodes.map(code => ({ code, errors }))
    }
  )
})
