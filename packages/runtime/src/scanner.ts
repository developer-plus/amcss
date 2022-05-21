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
      amClasses.forEach((amClass) => {
        if (!this.classNameSet.has(amClass.className)) {
          if (this._ctx._AmClassMap[scanner.pid!])
            this._ctx._AmClassMap[scanner.pid!].push(amClass)
          else this._ctx._AmClassMap[scanner.pid!] = [amClass]

          this.classNameSet.add(amClass.className)
        }
      })
    })
  }

  handleDefaultPluginScanner(code: string) {
    const { amClasses, unResolvedClassNames }
      = this._ctx.defaultPlugin.scanner(code)
    amClasses.forEach((amClass) => {
      if (!this.classNameSet.has(amClass.className)) {
        if (this._ctx._AmClassMap[DefaultName])
          this._ctx._AmClassMap[DefaultName].push(amClass)
        else this._ctx._AmClassMap[DefaultName] = [amClass]
        this.classNameSet.add(amClass.className)
      }
    })
    return unResolvedClassNames
  }

  reset() {}
}
