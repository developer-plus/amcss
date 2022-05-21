import type { AmClass, AmNode, BasicObject } from '~/types'

export type Scanner<T extends BasicObject = {}> = ((
  /**
   * @description 从 vite 接收的 code 字符串
   */
  code: string,
  /**
   * @description  无法处理的 className，还要包含 shortcuts 中的内容
   */
  unResolvedClassNames: Set<string>
) => { amClasses: AmClass<T>[]; unResolvedClassNames: Set<string> }) & {
  pid?: symbol
}

export type Compiler<
  T extends BasicObject = {},
  N extends BasicObject = {}
> = ((amClass: AmClass<T>) => AmNode<T, N>[]) & { pid?: symbol }

export type Generator<
  T extends BasicObject = {},
  N extends BasicObject = {}
> = ((amNode: AmNode<T, N>) => string) & { pid?: symbol }

// createPlugin
export interface PluginOptions<
  T extends BasicObject = {},
  N extends BasicObject = {}
> {
  /**
   * @description: 插件的唯一 id
   */
  pid: symbol
  /**
   * @description: 扫描器
   */
  scanner: Scanner<T>
  /**
   * @description: 编译器
   */
  compiler: Compiler<T, N>
  /**
   * @description: 生成器
   */
  generator: Generator<T, N>
}
