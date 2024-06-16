'use strict'

describe('Environment', () => {
  test('process.env', () => {
    expect(process.env.NODE_ENV).toBe('development')
  })
})
