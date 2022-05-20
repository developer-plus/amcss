export type BasicObject = Record<string | number | symbol, unknown>

// 编译器
export interface AmNode<T extends BasicObject, N extends BasicObject>
  extends AmClass<T> {
  /**
   * @description: cssStyleObject { width: '10px', ... }
   */
  attrs: Record<string, string>

  /**
   * @description: 允许插件在其配置中添加自己想要的配置
   */
  options?: N
}

// 扫描器
export interface AmClass<T extends BasicObject> {
  /**
   * @description 完整的 class 名称
   */
  className: string

  /**
   * @description class 前缀 hover:w-10 -> hover
   */
  prefix?: string

  /**
   * @description class 后缀 hover:bg-red/1 -> 1
   */
  suffix?: string

  /**
   * @description: 基本 class 名称 hover:bg-red/1 -> bg-red
   */
  pureName: string

  /**
   * @description: 所用插件的唯一 id
   */
  pid: string

  /**
   * @description: 允许插件在其配置中添加自己想要的配置
   */
  extension?: T
}

export * from './plugin'
