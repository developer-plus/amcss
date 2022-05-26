import type { AmClass } from '@amcss/types'
import type { TransFormerResult } from '@amcss/transformer'
import { transformer } from '@amcss/transformer'
import {
  AtleastOneSpaceReg,
  ClassNameReg,
  END_OF_LINE,
  SPACE_STRING
} from './re'

export function createDefaultPlugin(
  preset: any[] = [],
  shortcuts: Record<string, string> = {}
) {
  return new DefaultPlugin(preset, shortcuts)
}

interface DefaultPluginScannerReturnValue {
  // 根据 code 处理的 amClasses，这里记得也要将 shortcuts 进行处理
  amClasses: AmClass[]
  // 无法处理的 className，还要包含 shortcuts 中的内容
  unResolvedClassNames: Set<string>
}

export class DefaultPlugin {
  // 创建容器
  private amClasses: AmClass[] = []
  private unResolvedClassNames: Set<string> = new Set<string>()
  private classSet: Set<string> = new Set<string>()
  private amClassMap = new Map<string, AmClass | null>()

  constructor(
    private preset: any[],
    private shortcuts: Record<string, string>
  ) {}

  scanner(code: string) {
    // 去除上次解析结果
    this._clearContent()
    // 提取容器
    const { amClassMap, unResolvedClassNames, amClasses, classSet } = this
    // 扫描 code
    const matches = [...code.matchAll(ClassNameReg)]
    const contents = matches.flatMap(match =>
      match[0].replace(END_OF_LINE, SPACE_STRING).split(AtleastOneSpaceReg)
    )
    // 产生
    contents.forEach(content => this._contentHandler(content))
    classSet.forEach(value => amClasses.push(createAmClass(value, amClassMap)))

    return {
      amClasses,
      unResolvedClassNames
    } as DefaultPluginScannerReturnValue
  }

  private _contentHandler(content: string) {
    // FIXME: should fix shortcuts reference itself recursively
    const { shortcuts } = this
    const shortcut = shortcuts[content]

    const resolveTransformed = transformer(content)

    if (resolveTransformed)
      this._identifiedProcessing(content, resolveTransformed)
    else if (shortcut)
      this._scannerSplitShortcut(shortcut)
    else this._processingNotRecognized(content)
  }

  private _clearContent() {
    this.amClasses.length = 0
    this.unResolvedClassNames.clear()
    this.classSet.clear()
  }

  private _scannerSplitShortcut(shortcut: string) {
    const contents = shortcut.split(AtleastOneSpaceReg)
    contents.forEach(content => this._contentHandler(content))
  }

  private _processingNotRecognized(content: string) {
    const { unResolvedClassNames } = this
    unResolvedClassNames.add(content)
  }

  private _identifiedProcessing(
    content: string,
    resolveTransformed: TransFormerResult
  ) {
    const { amClassMap, classSet } = this
    classSet.add(content)
    amClassMap.set(content, { ...resolveTransformed, pid: 'Default' })
  }
}

export function createAmClass(
  origin: string,
  amClassMap: Map<string, AmClass | null>
) {
  const resolveTransformed = amClassMap.get(origin)
  return {
    ...resolveTransformed
  } as AmClass
}
