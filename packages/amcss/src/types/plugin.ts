import type { AmClass, AmNode, BasicObject } from '@/types'

export type Scanner<T extends BasicObject = {}> = (code: string) => AmClass<T>
export type Compiler<T extends BasicObject = {}, N extends BasicObject = {}> = (code: AmClass<T>) => AmNode<T, N>
export type Generator<T extends BasicObject = {}, N extends BasicObject = {}> = (amNode: AmNode<T, N>) => string

// createPlugin
export interface PluginOptions<T extends BasicObject = {}, N extends BasicObject = {}> {
  /**
   * @description: 插件的唯一 id
   */
  name: string
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
