import { resolve } from 'path'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['index'],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: false
    }
  },
  alias: {
    '@': resolve(__dirname, 'src')
  }
})
