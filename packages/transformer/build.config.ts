import { URL, fileURLToPath } from 'url'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true
  },
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url))
  }
})
