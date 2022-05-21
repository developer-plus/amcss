import type { AmClass, AmNode, PresetsRules } from '~/types'

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
  ) {
    this.preset = []
    this.shortcuts = {}
  }

  scanner(_: string) {
    return {} as DefaultPluginScannerReturnValue
  }

  compiler(_: AmClass) {
    return {} as AmNode
  }

  generator(_: AmNode) {
    return 'css code'
  }
}
