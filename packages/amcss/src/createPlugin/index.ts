import type { BasicObject, PluginOptions } from '@/types'

export function createPlugin<T extends BasicObject = {}, N extends BasicObject = {}>(options: PluginOptions<T, N>) {
  return options
}
