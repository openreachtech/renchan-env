// @ts-check
'use strict'

const typedEnv = require('../../app/typedEnv')

/*
 * process.env will be updated by `dotenv.config()`.
 */
const processEnv = process.env

beforeEach(() => {
  process.env = { ...processEnv }
})
afterEach(() => {
  process.env = processEnv
})

/**
 * 此のテストでは、typeEnv にインテリジェンスが効くかどうかを見ている。
 * 其の為、テストのバリエーションは不要。、
 */
describe('typedEnv', () => {
  test('key-value', () => {
    const expectedEnv = {
      NODE_ENV: 'development',
      API_HOST: 'dev.openreach.tech',
      API_KEY: 'devdev',
    }

    expect(typedEnv.NODE_ENV).toEqual(expectedEnv.NODE_ENV)
    expect(typedEnv.API_HOST).toEqual(expectedEnv.API_HOST)
    expect(typedEnv.API_KEY).toEqual(expectedEnv.API_KEY)
  })
})
