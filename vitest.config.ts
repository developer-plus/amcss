import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vitest']
    })
  ],
  test: {
    includeSource: ['packages/**/*']
  },
  alias: {
    runtime: resolve(__dirname, 'packages/runtime/')
  }
})
