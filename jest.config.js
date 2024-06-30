'use strict'

module.exports = {
  setupFilesAfterEnv: [
    '@openreachtech/jest-constructor-spy/config/setupAfterEnv.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}
