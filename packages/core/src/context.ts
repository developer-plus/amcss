import type {
  AmClass,
  AmNode,
  Compiler,
  Generator,
  PluginOptions,
  PresetsRules,
  Scanner
} from './types'

interface ContextOptions {
  preset?: PresetsRules[]
  // todo 捷径
  // shortcuts: Record<string, string>
  plugins?: PluginOptions[]
}

export function createContext(options: ContextOptions) {
  return new Context(options)
}

export class Context {
  css = ''
  _code = ''
  _AmNodeSet: Record<string, AmNode[]> = {}
  _AmClassSet: Record<string, AmClass[]> = {}
  _classNameSet: Set<string> = new Set<string>()
  scannerList: Scanner[] = []
  compilerList: Compiler[] = []
  generatorList: Generator[] = []
  _AmNodeCache: Map<string, AmNode> = new Map()

  constructor(public _options: ContextOptions) {
    this.initialization()
  }

  initialization() {
    this.initPlugins()
  }

  initPlugins() {
    const { plugins = [] } = this._options
    plugins.forEach((item) => {
      const { scanner, compiler, generator, name } = item
      this.scannerList.push(Object.assign(scanner, { name }))
      this.compilerList.push(Object.assign(compiler, { name }))
      this.generatorList.push(Object.assign(generator, { name }))
    })
  }

  parseCode(code: string) {
    this._code = code
    this.scheduler()
  }

  scheduler() {
    this.scannerHandler()
    this.compilerHandler()
    this.generatorHandler()
  }

  scannerHandler() {
    this.scannerList.forEach((scanner) => {
      const amClasses = scanner(this._code)
      amClasses.forEach((amClass) => {
        if (this._classNameSet.has(amClass.className)) {
          if (this._AmClassSet[scanner.name])
            this._AmClassSet[scanner.name].push(amClass)
          else
            this._AmClassSet[scanner.name] = [amClass]

          this._classNameSet.add(amClass.className)
        }
      })
    })
  }

  compilerHandler() {
    this.compilerList.forEach((compiler) => {
      const { name } = compiler
      const amNodeCache = this._AmNodeCache.get(name)
      const amNodeSet = (this._AmNodeSet[name] = this._AmNodeSet[name] || [])
      if (amNodeCache) {
        amNodeSet.push(amNodeCache)
        return
      }

      const amClassSet = this._AmClassSet[name] || []
      amClassSet.forEach((amClass) => {
        const amNodes = compiler(amClass)
        amNodes.forEach((amNode) => {
          this._AmNodeCache.set(amNode.className, amNode)
          amNodeSet.push(amNode)
        })
      })
    })
  }

  generatorHandler() {
    this.generatorList.forEach((generator) => {
      const { name } = generator
      const amNodes = this._AmNodeSet[name]
      amNodes.forEach((amNode) => {
        this.css += generator(amNode)
      })
    })
  }
}
