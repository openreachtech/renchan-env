import module from 'module'
const require = module.createRequire(import.meta.url)

const core = require('./index.js')

export const DotenvLoader = core.DotenvLoader
export const EnvironmentFacade = core.EnvironmentFacade
export const EnvironmentResolver = core.EnvironmentResolver

export default {
  DotenvLoader,
  EnvironmentFacade,
  EnvironmentResolver,
}
