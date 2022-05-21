import type { Context } from './context'
import { DefaultName } from './context'
import type { Generator } from '~/types'

export class ContextGenerator {
  generatorList: Generator[] = []
  constructor(public _ctx: Context) {}
  generatorHandler() {
    this.handleDefaultPluginGenerator()
    this.generatorList.forEach((generator) => {
      const { pid: name } = generator
      const amNodeSet = this._ctx._AmNodeMap[name!]
      amNodeSet.forEach((amNode) => {
        this._ctx.css += generator(amNode)
      })
    })
  }

  handleDefaultPluginGenerator() {
    const amNodeSet = this._ctx._AmNodeMap[DefaultName]
    amNodeSet.forEach((amNode) => {
      this._ctx.css += this._ctx.defaultPlugin.generator(amNode)
    })
  }
}
