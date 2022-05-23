export type BasicObject = Record<string | number | symbol, unknown>

// 编译器
export interface AmNode<T extends BasicObject = {}, N extends BasicObject = {}>
  extends AmClass<T> {
  /**
   * css 的样式对象，key 需要符合 kebab-case
   * @example { width: "10px", height: "10px" }
   */
  styleObject: Record<string, string>

  /**
   * @description: 允许插件在其配置中添加自己想要的配置
   */
  options?: N
}

// 扫描器
export interface AmClass<T extends BasicObject = {}> {
  /**
   * 初始的完整的 class 字符串
   * @example "hover:bg-red/1"
   */
  origin: string

  /**
   * 伪类、媒体查询、暗色模式等
   * @example "hover:", "xl:", "dark:"
   */
  annotation: AmAnnotation

  /**
   * 纯净的 css 字符串
   * @example "w-1", "w-1/4", "justify-center"
   */
  pure: string

  /**
   * @description: 所用插件的唯一 id
   */
  pid: string

  /**
   * @description: 允许插件在其配置中添加自己想要的配置
   */
  extension?: T
}

export interface AmAnnotation {
  /**
   * 伪类
   */
  pseudo: string[]
  /**
   * 暗色模式
   * @default false
   */
  dark: boolean
  /**
   * 媒体查询
   */
  breakpoints: string[]
}
