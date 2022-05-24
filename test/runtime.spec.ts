import { createContext, createPlugin } from '@amcss/runtime'

const pid = Symbol('121')
const plugin = createPlugin({
  pid,
  scanner() {
    return {
      amClasses: [],
      unResolvedClassNames: new Set()
    }
  },
  compiler() {
    return []
  },
  generator() {
    return ''
  }
})

const ctx = createContext({
  plugins: [plugin]
})

describe('test runtime core', () => {
  it('collection scanner', () => {
    expect(ctx.scheduler.scanner.scannerList.length).toBe(1)
    expect(ctx.scheduler.scanner.scannerList[0].pid).not.toBeUndefined()
    expect(ctx.scheduler.scanner.scannerList[0].pid).toBe(pid)
  })

  it('collection compiler', () => {
    expect(ctx.scheduler.compiler.compilerList.length).toBe(1)
    expect(ctx.scheduler.compiler.compilerList[0].pid).not.toBeUndefined()
    expect(ctx.scheduler.compiler.compilerList[0].pid).toBe(pid)
  })

  it('collection generator', () => {
    expect(ctx.scheduler.generator.generatorList.length).toBe(1)
    expect(ctx.scheduler.generator.generatorList[0].pid).not.toBeUndefined()
    expect(ctx.scheduler.generator.generatorList[0].pid).toBe(pid)
  })
})
