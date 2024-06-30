import DotenvLoader from '../lib/DotenvLoader'
import EnvironmentFacade from '../lib/EnvironmentFacade'
import EnvironmentResolver from '../lib/EnvironmentResolver'

declare module '@openreachtech/renchan-env' {
  const DotenvLoader: typeof DotenvLoader
  const EnvironmentFacade: typeof EnvironmentFacade
  const EnvironmentResolver: typeof EnvironmentResolver

  export {
    DotenvLoader,
    EnvironmentFacade,
    EnvironmentResolver,
  }
}
