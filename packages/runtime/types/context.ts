import type { PluginOptions } from './plugin'
import type { PresetsRules } from './presets'

export interface ContextOptions {
  presets?: PresetsRules[]
  shortcuts: Record<string, string>
  plugins?: PluginOptions[]
}
