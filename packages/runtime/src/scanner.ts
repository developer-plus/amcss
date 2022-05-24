import type { AmClass } from '@amcss/types'
import type { Context } from './context'
import { DefaultName } from './context'
import type { Scanner } from '~/types'

export class ContextScanner {
  scannerList: Scanner[] = []
  classNameSet: Set<string> = new Set<string>()
  constructor(public _ctx: Context) {}
  scannerHandler() {
    let unResolvedNames = this.handleDefaultPluginScanner(this._ctx._code)
    this.scannerList.forEach((scanner) => {
      const { amClasses, unResolvedClassNames } = scanner(
        this._ctx._code,
        unResolvedNames
      )
      unResolvedNames = unResolvedClassNames
      this.setAmClassMap(amClasses, scanner.pid!)
    })
  }

  handleDefaultPluginScanner(code: string) {
    const { amClasses, unResolvedClassNames }
      = this._ctx.defaultPlugin.scanner(code)
    this.setAmClassMap(amClasses, DefaultName)
    return unResolvedClassNames
  }

  setAmClassMap(amClasses: AmClass[], key: symbol) {
    amClasses.forEach((amClass) => {
      if (!this.classNameSet.has(amClass.origin)) {
        const amClassMap = (this._ctx._AmClassMap[key]
          = this._ctx._AmClassMap[key] || [])
        amClassMap.push(amClass)
        this.classNameSet.add(amClass.origin)
      }
    })
  }

  reset() {}
}
