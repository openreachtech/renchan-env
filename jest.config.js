'use strict'

module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/tests/setupAfterEnv.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}
