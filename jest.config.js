'use strict'

module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup-after-env.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}
