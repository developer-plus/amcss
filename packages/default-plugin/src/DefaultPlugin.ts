import type { AmClass } from '../../types/src/runtime'
import type { PresetsRules } from '../../runtime/types'
import { transformer } from '../../transformer/src/transformer'
import { AtleastOneSpaceReg, ClassNameReg, END_OF_LINE } from './re'

export function createDefaultPlugin(
  preset: PresetsRules[] = [],
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
  constructor(
    private preset: PresetsRules[],
    private shortcuts: Record<string, string>
  ) {}

  scanner(code: string) {
    const amClasses: AmClass[] = []
    const unResolvedClassNames: Set<string> = new Set<string>()
    const classSet: Set<string> = new Set<string>()
    const matches = [...code.matchAll(ClassNameReg)]
    const contents = matches.flatMap(match => match[0].replace(END_OF_LINE, ' ').split(AtleastOneSpaceReg))
    contents.forEach(content => contentHandler(content, this.shortcuts))
    classSet.forEach(value => amClasses.push(createAmClass(value)))

    function contentHandler(content: string, shortcuts: Record<string, string> = {}) {
      // FIXME: should fix shortcuts reference itself recursively
      if (transformer(content)) {
        classSet.add(content)
      }
      else if (shortcuts[content]) {
        const contents = shortcuts[content].split(AtleastOneSpaceReg)
        contents.forEach(content => contentHandler(content, shortcuts))
      }
      else {
        unResolvedClassNames.add(content)
      }
    }

    return {
      amClasses,
      unResolvedClassNames
    } as DefaultPluginScannerReturnValue
  }
}

export function createAmClass(origin: string) {
  const annotation = transformer(origin)?.annotation
  const pure = transformer(origin)?.pure
  return {
    annotation,
    origin,
    pure,
    pid: 'Default'
  } as AmClass
}
