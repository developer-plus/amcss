import { ContextCompiler } from './compiler'
import type { Context } from './context'
import { ContextGenerator } from './generator'
import { ContextScanner } from './scanner'
import type { PluginOptions } from '~/types'

export class ContextScheduler {
  scanner: ContextScanner
  compiler: ContextCompiler
  generator: ContextGenerator
  constructor(public _ctx: Context) {
    this.scanner = new ContextScanner(_ctx)
    this.compiler = new ContextCompiler(_ctx)
    this.generator = new ContextGenerator(_ctx)
  }

  initHandler(options: PluginOptions) {
    const { scanner, compiler, generator, pid } = options
    this.scanner.scannerList.push(Object.assign(scanner, { pid }))
    this.compiler.compilerList.push(Object.assign(compiler, { pid }))
    this.generator.generatorList.push(Object.assign(generator, { pid }))
  }

  reset() {
    this._ctx._AmClassMap = {}
    this._ctx._AmNodeMap = {}
    this._ctx.css = ''
  }

  start() {
    this.scanner.scannerHandler()
    this.compiler.compilerHandler()
    this.generator.generatorHandler()
  }
}
