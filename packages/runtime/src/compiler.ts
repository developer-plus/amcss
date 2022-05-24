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
    // 取所有的编译器
    this.compilerList.forEach((compiler) => {
      const { pid } = compiler
      // 根据插件id拿到编译器的amnode列表
      const amNodeSet = (this._ctx._AmNodeMap[pid!]
        = this._ctx._AmNodeMap[pid!] || [])
      const amClassSet = this._ctx._AmClassMap[pid!] || []
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
      let amNodeCache = this._AmNodeCache.get(amClass.origin)
      if (!amNodeCache) {
        amNodeCache = this._ctx.defaultPlugin.compiler(amClass)
        this._AmNodeCache.set(amClass.origin, amNodeCache!)
        return
      }
      amNodeSet.push(amNodeCache)
    })
  }
}
