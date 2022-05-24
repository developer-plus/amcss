import type { AmNode } from '@amcss/types'
import type { Context } from './context'
import { DefaultName } from './context'
import type { Compiler } from '~/types'

export class ContextCompiler {
  compilerList: Compiler[] = []
  _AmNodeCache: Map<string, AmNode> = new Map()
  constructor(public _ctx: Context) {}
  compilerHandler() {
    this.handleDefaultPluginCompile()
    this.compilerList.forEach((compiler) => {
      const { pid: name } = compiler
      const amNodeSet = (this._ctx._AmNodeMap[name!]
        = this._ctx._AmNodeMap[name!] || [])
      const amClassSet = this._ctx._AmClassMap[name!] || []
      amClassSet.forEach((amClass) => {
        const amNodeCache = this._AmNodeCache.get(amClass.origin)
        if (amNodeCache) {
          amNodeSet.push(amNodeCache)
          return
        }
        const amNodes = compiler(amClass)
        amNodes.forEach((amNode) => {
          this._AmNodeCache.set(amNode.origin, amNode)
          amNodeSet.push(amNode)
        })
      })
    })
  }

  handleDefaultPluginCompile() {
    const amClasses = this._ctx._AmClassMap[DefaultName] || []
    const amNodeSet = (this._ctx._AmNodeMap[DefaultName]
      = this._ctx._AmNodeMap[DefaultName] || [])
    amClasses.forEach((amClass) => {
      const amNodeCache = this._AmNodeCache.get(amClass.origin)
      if (!amNodeCache) {
        const amNode = this._ctx.defaultPlugin.compiler(amClass)
        this._AmNodeCache.set(amClass.origin, amNode)
        amNodeSet.push(amNode)
        return
      }
      amNodeSet.push(amNodeCache)
    })
  }
}
