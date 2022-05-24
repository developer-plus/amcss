import type { AmClass, AmNode } from '@amcss/types'
import { ContextScheduler } from './scheduler'
import type { DefaultPlugin } from '~/mock/DefaultPlugin'
import { createDefaultPlugin } from '~/mock/DefaultPlugin'
import type { PluginOptions, PresetsRules } from '~/types'

interface ContextOptions {
  preset?: PresetsRules[]
  // todo 捷径
  shortcuts?: Record<string, string>
  plugins?: PluginOptions[]
}

export function createContext(options: ContextOptions) {
  return new Context(options)
}

export const DefaultName = Symbol('default')

export class Context {
  css = ''
  _code = ''
  _AmNodeMap: Record<symbol, AmNode[]> = {}
  _AmClassMap: Record<symbol, AmClass[]> = {}
  defaultPlugin: DefaultPlugin
  scheduler: ContextScheduler

  constructor(public _options: ContextOptions) {
    this.scheduler = new ContextScheduler(this)
    this.initialization()
    this.defaultPlugin = createDefaultPlugin(
      _options.preset,
      _options.shortcuts
    )
  }

  initialization() {
    this.initPlugins()
  }

  initPlugins() {
    const { plugins = [] } = this._options
    plugins.forEach((item) => {
      this.scheduler.initHandler(item)
    })
  }

  parseCode(code: string) {
    this._code = code
    this.scheduler.start()
  }
}
