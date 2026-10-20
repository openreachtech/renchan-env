'use strict'

const {
  ConstructorSpy,
} = require('@openreachtech/jest-constructor-spy')

globalThis.constructorSpy = ConstructorSpy.create({
  jest,
})

afterEach(() => {
  jest.restoreAllMocks()
})
